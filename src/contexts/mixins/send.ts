import type { TelegramObjects, TelegramParams } from "@gramio/types";
import { applyMixins, isRichString } from "utils";
import { Poll } from "../../structures/index";
import type {
	BotLike,
	MessageDraftAppend,
	MessageDraftPiece,
	Optional,
	RichChunk,
	StreamMessageOptions,
	StreamRichMessageOptions,
	tSendMethods,
} from "../../types";
import type { Context } from "../context";
import { MessageContext } from "../message";

/** Module-wide counter so concurrent {@link RichMessageDraft | drafts} get distinct non-zero ids. */
let richDraftCounter = 0;

/** Reduce a {@link RichChunk} to its rich-markdown string. */
function chunkToMarkdown(chunk: RichChunk): string {
	return typeof chunk === "string"
		? chunk
		: (chunk.toInputRichMessage().markdown ?? "");
}

/**
 * A handle to a streaming rich-message draft.
 *
 * Append fragments as they are generated — preview updates are sent (throttled) via
 * `sendRichMessageDraft`. The draft is **ephemeral** (a ~30-second preview), so you MUST
 * {@link RichMessageDraft.finalize | finalize} it to persist a real message. `await using`
 * finalizes automatically on scope exit.
 *
 * @example
 * ```ts
 * await using draft = ctx.streamRichMessage();
 * for await (const token of llm) draft.append(token); // token = RichString | rich-markdown
 * // scope exit → one sendRichMessage persists the full message
 * ```
 */
export class RichMessageDraft<Bot extends BotLike> {
	#bot: Bot;
	#chatId: number;
	#draftId: number;
	#throttle: number;
	#richOptions: Pick<
		TelegramObjects.TelegramInputRichMessage,
		"is_rtl" | "skip_entity_detection"
	>;
	#draftParams: Record<string, unknown>;
	#messageParams: Record<string, unknown>;
	#signal?: AbortSignal;

	#markdown = "";
	#dirty = false;
	#finished = false;
	#lastFlush = 0;
	#timer: ReturnType<typeof setTimeout> | undefined;
	#flushing: Promise<unknown> | undefined;
	#result: MessageContext<Bot> | undefined;

	constructor(
		bot: Bot,
		chatId: number,
		options: StreamRichMessageOptions = {},
		businessConnectionId?: string,
		threadId?: number,
	) {
		this.#bot = bot;
		this.#chatId = chatId;
		this.#draftId = options.draftId ?? ++richDraftCounter;
		this.#throttle = options.throttle ?? 1000;
		this.#richOptions = options.richOptions ?? {};
		this.#signal = options.signal;

		const draftParams: Record<string, unknown> = { ...options.draftParams };
		if (threadId && draftParams.message_thread_id === undefined)
			draftParams.message_thread_id = threadId;
		this.#draftParams = draftParams;

		const messageParams: Record<string, unknown> = { ...options.messageParams };
		if (businessConnectionId && messageParams.business_connection_id === undefined)
			messageParams.business_connection_id = businessConnectionId;
		if (threadId && messageParams.message_thread_id === undefined)
			messageParams.message_thread_id = threadId;
		this.#messageParams = messageParams;
	}

	/** Current accumulated rich-markdown. */
	get markdown(): string {
		return this.#markdown;
	}

	/** The draft id used for every preview update. */
	get draftId(): number {
		return this.#draftId;
	}

	/** Whether {@link finalize} has already run. */
	get finalized(): boolean {
		return this.#result !== undefined;
	}

	/** Append a fragment (a `RichString` or raw rich-markdown) and schedule a throttled preview. */
	append(chunk: RichChunk): this {
		if (this.#finished)
			throw new Error("RichMessageDraft: cannot append after finalize()");
		this.#markdown += chunkToMarkdown(chunk);
		this.#schedule();
		return this;
	}

	/** Replace the entire draft content and schedule a preview. */
	set(content: RichChunk): this {
		if (this.#finished)
			throw new Error("RichMessageDraft: cannot set() after finalize()");
		this.#markdown = chunkToMarkdown(content);
		this.#schedule();
		return this;
	}

	#schedule() {
		this.#dirty = true;
		if (this.#signal?.aborted || this.#timer) return;
		const wait = Math.max(0, this.#throttle - (Date.now() - this.#lastFlush));
		this.#timer = setTimeout(() => {
			this.#timer = undefined;
			void this.#flush();
		}, wait);
		// a pending preview should never keep the process alive on its own
		(this.#timer as { unref?: () => void }).unref?.();
	}

	async #flush() {
		if (!this.#dirty || this.#finished || this.#signal?.aborted) return;
		if (this.#flushing) await this.#flushing.catch(() => {});
		if (!this.#dirty || this.#finished || this.#signal?.aborted) return;

		this.#dirty = false;
		this.#lastFlush = Date.now();
		const markdown = this.#markdown;
		this.#flushing = this.#bot.api.sendRichMessageDraft({
			chat_id: this.#chatId,
			draft_id: this.#draftId,
			rich_message: { markdown, ...this.#richOptions },
			...this.#draftParams,
		});
		await this.#flushing.catch(() => {});
		this.#flushing = undefined;
		// a newer append landed while we were sending → schedule another preview
		if (this.#dirty && !this.#finished) this.#schedule();
	}

	/**
	 * Persist the streamed draft as a real message via `sendRichMessage`. Idempotent — repeated
	 * calls return the same {@link MessageContext}. Pass params to override the finalizing call.
	 */
	async finalize(
		params: Optional<
			TelegramParams.SendRichMessageParams,
			"chat_id" | "rich_message"
		> = {},
	): Promise<MessageContext<Bot>> {
		if (this.#result) return this.#result;
		this.#finished = true;
		if (this.#timer) {
			clearTimeout(this.#timer);
			this.#timer = undefined;
		}
		if (this.#flushing) await this.#flushing.catch(() => {});

		const response = await this.#bot.api.sendRichMessage({
			chat_id: this.#chatId,
			rich_message: { markdown: this.#markdown, ...this.#richOptions },
			...this.#messageParams,
			...params,
		});
		this.#result = new MessageContext({ bot: this.#bot, payload: response });
		return this.#result;
	}

	/** `await using` hook — finalizes on scope exit unless the stream was aborted. */
	async [Symbol.asyncDispose](): Promise<void> {
		if (this.#finished || this.#result) return;
		if (this.#signal?.aborted) {
			this.#finished = true;
			if (this.#timer) {
				clearTimeout(this.#timer);
				this.#timer = undefined;
			}
			return;
		}
		await this.finalize();
	}
}

/** Telegram's per-message text limit; the draft handle rolls over to a new message past it. */
const MESSAGE_TEXT_LIMIT = 4096;

function normalizeDraftAppend(piece: MessageDraftAppend): {
	text: string;
	entities: TelegramObjects.TelegramMessageEntity[];
} {
	return typeof piece === "string"
		? { text: piece, entities: [] }
		: { text: piece.text, entities: piece.entities ?? [] };
}

/**
 * A handle to a streaming **plain-text** message draft — the `await using` companion to
 * {@link SendMixin.streamMessage}'s iterable form, mirroring {@link RichMessageDraft}.
 *
 * Append pieces (strings or `FormattableString`-shaped `{ text, entities }`); throttled previews
 * go out via `sendMessageDraft`, and text past {@link MESSAGE_TEXT_LIMIT | 4096 chars} rolls over
 * into a new message. {@link MessageDraft.finalize | finalize} persists every segment via
 * `sendMessage`; `await using` finalizes on scope exit.
 *
 * @example
 * ```ts
 * await using draft = ctx.streamMessage();
 * for await (const token of llm) draft.append(token); // or draft.append(format`…`)
 * // scope exit → one (or more, if long) sendMessage calls persist the output
 * ```
 */
export class MessageDraft<Bot extends BotLike> {
	#bot: Bot;
	#chatId: number;
	#throttle: number;
	#draftIdBase: number;
	#draftParams: Record<string, unknown>;
	#messageParams: Record<string, unknown>;
	#signal?: AbortSignal;

	#text = "";
	#entities: TelegramObjects.TelegramMessageEntity[] = [];
	#segment = 0;
	#sends: Promise<MessageContext<Bot>>[] = [];

	#dirty = false;
	#finished = false;
	#lastFlush = 0;
	#timer: ReturnType<typeof setTimeout> | undefined;
	#flushing: Promise<unknown> | undefined;
	#result: MessageContext<Bot>[] | undefined;

	constructor(
		bot: Bot,
		chatId: number,
		options: StreamMessageOptions = {},
		draftIdBase = 0,
		businessConnectionId?: string,
		threadId?: number,
	) {
		this.#bot = bot;
		this.#chatId = chatId;
		this.#throttle = options.throttle ?? 1000;
		this.#draftIdBase = draftIdBase;
		this.#signal = options.signal;

		const draftParams: Record<string, unknown> = { ...options.draftParams };
		if (threadId && draftParams.message_thread_id === undefined)
			draftParams.message_thread_id = threadId;
		this.#draftParams = draftParams;

		const messageParams: Record<string, unknown> = { ...options.messageParams };
		if (businessConnectionId && messageParams.business_connection_id === undefined)
			messageParams.business_connection_id = businessConnectionId;
		if (threadId && messageParams.message_thread_id === undefined)
			messageParams.message_thread_id = threadId;
		this.#messageParams = messageParams;
	}

	/** Accumulated text of the current (not-yet-finalized) segment. */
	get text(): string {
		return this.#text;
	}

	/** Whether {@link finalize} has already run. */
	get finalized(): boolean {
		return this.#result !== undefined;
	}

	/** Append a piece (string or `{ text, entities }`); entity offsets are relative to the piece. */
	append(piece: MessageDraftAppend): this {
		if (this.#finished)
			throw new Error("MessageDraft: cannot append after finalize()");
		const { text, entities } = normalizeDraftAppend(piece);
		// Roll the completed segment over to its own message once we'd exceed the limit.
		if (this.#text.length > 0 && this.#text.length + text.length > MESSAGE_TEXT_LIMIT)
			this.#rollover();

		const base = this.#text.length;
		this.#text += text;
		for (const entity of entities)
			this.#entities.push({ ...entity, offset: entity.offset + base });
		this.#schedule();
		return this;
	}

	#rollover() {
		this.#sends.push(this.#sendSegment(this.#text, this.#entities));
		this.#segment++;
		this.#text = "";
		this.#entities = [];
		this.#lastFlush = 0; // let the new segment preview immediately
	}

	#sendSegment(
		text: string,
		entities: TelegramObjects.TelegramMessageEntity[],
	): Promise<MessageContext<Bot>> {
		return this.#bot.api
			.sendMessage({
				chat_id: this.#chatId,
				text,
				entities,
				...this.#messageParams,
			})
			.then(
				(response) => new MessageContext({ bot: this.#bot, payload: response }),
			);
	}

	#schedule() {
		this.#dirty = true;
		if (this.#signal?.aborted || this.#timer) return;
		const wait = Math.max(0, this.#throttle - (Date.now() - this.#lastFlush));
		this.#timer = setTimeout(() => {
			this.#timer = undefined;
			void this.#flush();
		}, wait);
		(this.#timer as { unref?: () => void }).unref?.();
	}

	async #flush() {
		if (!this.#dirty || this.#finished || this.#signal?.aborted) return;
		if (this.#flushing) await this.#flushing.catch(() => {});
		if (!this.#dirty || this.#finished || this.#signal?.aborted) return;

		this.#dirty = false;
		this.#lastFlush = Date.now();
		this.#flushing = this.#bot.api.sendMessageDraft({
			chat_id: this.#chatId,
			draft_id: this.#draftIdBase + this.#segment,
			text: this.#text,
			entities: this.#entities,
			...this.#draftParams,
		});
		await this.#flushing.catch(() => {});
		this.#flushing = undefined;
		if (this.#dirty && !this.#finished) this.#schedule();
	}

	/**
	 * Persist every segment via `sendMessage`, in order. Idempotent — repeated calls return the
	 * same array. Returns `[]` if nothing was appended.
	 */
	async finalize(): Promise<MessageContext<Bot>[]> {
		if (this.#result) return this.#result;
		this.#finished = true;
		if (this.#timer) {
			clearTimeout(this.#timer);
			this.#timer = undefined;
		}
		if (this.#flushing) await this.#flushing.catch(() => {});

		if (this.#text.length > 0)
			this.#sends.push(this.#sendSegment(this.#text, this.#entities));
		this.#result = await Promise.all(this.#sends);
		return this.#result;
	}

	/** `await using` hook — finalizes on scope exit unless the stream was aborted. */
	async [Symbol.asyncDispose](): Promise<void> {
		if (this.#finished || this.#result) return;
		if (this.#signal?.aborted) {
			this.#finished = true;
			if (this.#timer) {
				clearTimeout(this.#timer);
				this.#timer = undefined;
			}
			return;
		}
		await this.finalize();
	}
}

interface SendMixinMetadata {
	get chatId(): number;
	get businessConnectionId(): string | undefined;
	get senderId(): number | undefined;
	get threadId(): number | undefined;
	isTopicMessage: () => boolean;
}

/** This object represents a mixin which can invoke `chatId`/`senderId`-dependent methods */
class SendMixin<Bot extends BotLike> {
	/**
	 * Sends message to current chat.
	 *
	 * Pass a `@gramio/format` `RichString` (from `@gramio/format/rich`) and it is sent via
	 * `sendRichMessage` instead — `bot.api.*` stays 1:1; the method is chosen here.
	 */
	async send(
		text: TelegramParams.SendMessageParams["text"],
		params: Optional<TelegramParams.SendMessageParams, "chat_id" | "text"> = {},
	) {
		if (isRichString(text))
			return this.sendRichMessage(
				text.toInputRichMessage(),
				params as Optional<
					TelegramParams.SendRichMessageParams,
					"chat_id" | "rich_message"
				>,
			);

		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendMessage({
			chat_id: this.chatId || this.senderId || 0,
			text,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends rich message to current chat */
	async sendRichMessage(
		richMessage: TelegramParams.SendRichMessageParams["rich_message"],
		params: Optional<
			TelegramParams.SendRichMessageParams,
			"chat_id" | "rich_message"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendRichMessage({
			chat_id: this.chatId || this.senderId || 0,
			rich_message: richMessage,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/**
	 * Streams a partial rich message draft to the current chat. The streamed
	 * draft is ephemeral and acts as a temporary 30-second preview — once the
	 * output is finalized, you **must** call `sendRichMessage` with the complete
	 * message to persist it.
	 */
	sendRichMessageDraft(
		richMessage: TelegramParams.SendRichMessageDraftParams["rich_message"],
		draftId: TelegramParams.SendRichMessageDraftParams["draft_id"],
		params: Optional<
			TelegramParams.SendRichMessageDraftParams,
			"chat_id" | "rich_message" | "draft_id"
		> = {},
	) {
		return this.bot.api.sendRichMessageDraft({
			chat_id: this.chatId || this.senderId || 0,
			draft_id: draftId,
			rich_message: richMessage,
			...params,
		});
	}

	/**
	 * Stream a rich message to the current chat, draft-first.
	 *
	 * The hard part of `sendRichMessageDraft` is the contract: the draft is an ephemeral ~30-second
	 * preview, and **you must** finalize it with `sendRichMessage` or the message vanishes. This
	 * helper owns that lifecycle (throttled previews, a single finalize), so you can't forget it.
	 *
	 * Two forms:
	 * - **Handle** — `const draft = ctx.streamRichMessage(); draft.append(chunk); … await draft.finalize()`.
	 *   With `await using`, finalize runs automatically on scope exit.
	 * - **Iterable** — pass an (async) iterable of chunks; it's drained, finalized, and the sent
	 *   message is returned.
	 *
	 * A chunk is a `@gramio/format` `RichString` or a raw rich-markdown string.
	 *
	 * @example
	 * ```ts
	 * // handle form (auto-finalize)
	 * await using draft = ctx.streamRichMessage();
	 * for await (const token of llm) draft.append(rich`${token}`);
	 *
	 * // iterable form
	 * const message = await ctx.streamRichMessage(llmStream);
	 * ```
	 */
	streamRichMessage(options?: StreamRichMessageOptions): RichMessageDraft<Bot>;
	streamRichMessage(
		stream: Iterable<RichChunk> | AsyncIterable<RichChunk>,
		options?: StreamRichMessageOptions,
	): Promise<MessageContext<Bot>>;
	streamRichMessage(
		first?:
			| StreamRichMessageOptions
			| Iterable<RichChunk>
			| AsyncIterable<RichChunk>,
		maybeOptions?: StreamRichMessageOptions,
	): RichMessageDraft<Bot> | Promise<MessageContext<Bot>> {
		const isStream =
			!!first &&
			(Symbol.asyncIterator in (first as object) ||
				Symbol.iterator in (first as object));
		const options =
			(isStream ? maybeOptions : (first as StreamRichMessageOptions)) ?? {};

		const draft = new RichMessageDraft<Bot>(
			this.bot,
			this.chatId || this.senderId || 0,
			options,
			this.businessConnectionId,
			this.threadId && this.isTopicMessage?.() ? this.threadId : undefined,
		);

		if (!isStream) return draft;

		const stream = first as Iterable<RichChunk> | AsyncIterable<RichChunk>;
		return (async () => {
			for await (const chunk of stream) {
				options.signal?.throwIfAborted();
				draft.append(chunk);
			}
			options.signal?.throwIfAborted();
			return draft.finalize();
		})();
	}

	/** Sends photo to current chat */
	async sendPhoto(
		photo: TelegramParams.SendPhotoParams["photo"],
		params: Optional<TelegramParams.SendPhotoParams, "chat_id" | "photo"> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendPhoto({
			chat_id: this.chatId || this.senderId || 0,
			photo,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends live photo to current chat */
	async sendLivePhoto(
		livePhoto: TelegramParams.SendLivePhotoParams["live_photo"],
		photo: TelegramParams.SendLivePhotoParams["photo"],
		params: Optional<
			TelegramParams.SendLivePhotoParams,
			"chat_id" | "live_photo" | "photo"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendLivePhoto({
			chat_id: this.chatId || this.senderId || 0,
			live_photo: livePhoto,
			photo,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends document to current chat */
	async sendDocument(
		document: TelegramParams.SendDocumentParams["document"],
		params: Optional<
			TelegramParams.SendDocumentParams,
			"chat_id" | "document"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendDocument({
			chat_id: this.chatId || this.senderId || 0,
			document,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends audio to current chat */
	async sendAudio(
		audio: TelegramParams.SendAudioParams["audio"],
		params: Optional<TelegramParams.SendAudioParams, "chat_id" | "audio"> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendAudio({
			chat_id: this.chatId || this.senderId || 0,
			audio,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends video to current chat */
	async sendVideo(
		video: TelegramParams.SendVideoParams["video"],
		params: Optional<TelegramParams.SendVideoParams, "chat_id" | "video"> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendVideo({
			chat_id: this.chatId || this.senderId || 0,
			video,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends animation to current chat */
	async sendAnimation(
		animation: TelegramParams.SendAnimationParams["animation"],
		params: Optional<
			TelegramParams.SendAnimationParams,
			"chat_id" | "animation"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendAnimation({
			chat_id: this.chatId || this.senderId || 0,
			animation,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends video note to current chat */
	async sendVideoNote(
		videoNote: TelegramParams.SendVideoNoteParams["video_note"],
		params: Optional<
			TelegramParams.SendVideoNoteParams,
			"chat_id" | "video_note"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendVideoNote({
			chat_id: this.chatId || this.senderId || 0,
			video_note: videoNote,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends voice to current chat */
	async sendVoice(
		voice: TelegramParams.SendVoiceParams["voice"],
		params: Optional<TelegramParams.SendVoiceParams, "chat_id" | "voice"> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendVoice({
			chat_id: this.chatId || this.senderId || 0,
			voice,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends location to current chat */
	async sendLocation(
		latitude: number,
		longitude: number,
		params: Optional<
			TelegramParams.SendLocationParams,
			"chat_id" | "latitude" | "longitude"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendLocation({
			chat_id: this.chatId || this.senderId || 0,
			latitude,
			longitude,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends invoice to current user */
	async sendInvoice(
		params: Optional<TelegramParams.SendInvoiceParams, "chat_id">,
	) {
		const response = await this.bot.api.sendInvoice({
			chat_id: this.chatId || this.senderId || 0,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends venue to current chat */
	async sendVenue(params: Optional<TelegramParams.SendVenueParams, "chat_id">) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendVenue({
			chat_id: this.chatId || this.senderId || 0,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends contact to current chat */
	async sendContact(
		params: Optional<TelegramParams.SendContactParams, "chat_id">,
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendContact({
			chat_id: this.chatId || this.senderId || 0,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends poll to current chat */
	async sendPoll(params: Optional<TelegramParams.SendPollParams, "chat_id">) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendPoll({
			chat_id: this.chatId || this.senderId || 0,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends checklist to current chat */
	async sendChecklist(
		params: Optional<TelegramParams.SendChecklistParams, "chat_id">,
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		// if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
		// 	params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendChecklist({
			chat_id: this.chatId || this.senderId || 0,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends sticker */
	async sendSticker(
		sticker: TelegramParams.SendStickerParams["sticker"],
		params: Optional<
			TelegramParams.SendStickerParams,
			"sticker" | "chat_id"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendSticker({
			chat_id: this.chatId || this.senderId || 0,
			sticker,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Stops poll in current chat */
	async stopPoll(
		messageId: number,
		params: Partial<TelegramParams.StopPollParams> = {},
	) {
		if (this.businessConnectionId && !params?.business_connection_id)
			params.business_connection_id = this.businessConnectionId;

		const response = await this.bot.api.stopPoll({
			chat_id: this.chatId || this.senderId || 0,
			message_id: messageId,
			...params,
		});

		return new Poll(response);
	}

	/** Sends a message draft to the current private chat */
	sendMessageDraft(
		params: Optional<TelegramParams.SendMessageDraftParams, "chat_id">,
	) {
		return this.bot.api.sendMessageDraft({
			chat_id: this.chatId || this.senderId || 0,
			...params,
		});
	}

	/** Sends chat action to current chat */
	sendChatAction(
		action: TelegramParams.SendChatActionParams["action"],
		params: Optional<
			TelegramParams.SendChatActionParams,
			"chat_id" | "action"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		return this.bot.api.sendChatAction({
			chat_id: this.chatId || this.senderId || 0,
			action,
			...params,
		});
	}

	/** Sends dice */
	async sendDice(
		emoji: TelegramParams.SendDiceParams["emoji"],
		params: Partial<TelegramParams.SendDiceParams> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendDice({
			chat_id: this.chatId || this.senderId || 0,
			emoji,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends paid media to current chat */
	async sendPaidMedia(
		paidMedia: TelegramParams.SendPaidMediaParams["media"],
		starCount: number,
		params: Optional<
			TelegramParams.SendPaidMediaParams,
			"chat_id" | "media" | "star_count"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;

		const response = await this.bot.api.sendPaidMedia({
			chat_id: this.chatId || this.senderId || 0,
			media: paidMedia,
			star_count: starCount,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sends media group to current chat */
	async sendMediaGroup(
		mediaGroup: TelegramParams.SendMediaGroupParams["media"],
		params: Optional<
			TelegramParams.SendMediaGroupParams,
			"chat_id" | "media"
		> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;
		if (this.threadId && this.isTopicMessage?.() && !params.message_thread_id)
			params.message_thread_id = this.threadId;

		const response = await this.bot.api.sendMediaGroup({
			chat_id: this.chatId || this.senderId || 0,
			media: mediaGroup,
			...params,
		});

		return response.map(
			(message) =>
				new MessageContext({
					bot: this.bot,
					payload: message,
				}),
		);
	}

	/**
	 * Automatically uses correct media method to send media
	 *
	 * @example
	 * ```js
	 * context.sendMedia({
	 *   type: 'photo',
	 *   photo: MediaUpload.path('./image.png'),
	 *   caption: 'good image yes yes'
	 * })
	 * ```
	 */
	sendMedia<T extends string>(
		query: { type: T } & tSendMethods,
	): ReturnType<
		T extends "animation"
			? typeof this.sendAnimation
			: T extends "audio"
				? typeof this.sendAudio
				: T extends "document"
					? typeof this.sendDocument
					: T extends "photo"
						? typeof this.sendPhoto
						: T extends "sticker"
							? typeof this.sendSticker
							: T extends "video_note"
								? typeof this.sendVideoNote
								: T extends "video"
									? typeof this.sendVideo
									: T extends "voice"
										? typeof this.sendVoice
										: () => never
	>;

	sendMedia(query: tSendMethods) {
		// INFO: kind of a hack for interoperability between TelegramInputMedia objects and sendMedia

		if ("media" in query) {
			// @ts-expect-error
			query[query.type] = query.media;

			//delete
			query.media = undefined;
		}

		if (query.type === "animation") {
			return this.sendAnimation(query.animation, query);
		}

		if (query.type === "audio") {
			return this.sendAudio(query.audio, query);
		}

		if (query.type === "document") {
			return this.sendDocument(query.document, query);
		}

		if (query.type === "photo") {
			return this.sendPhoto(query.photo, query);
		}

		if (query.type === "sticker") {
			return this.sendSticker(query.sticker, query);
		}

		if (query.type === "video_note") {
			return this.sendVideoNote(query.video_note, query);
		}

		if (query.type === "video") {
			return this.sendVideo(query.video, query);
		}

		if (query.type === "voice") {
			return this.sendVoice(query.voice, query);
		}

		throw new TypeError("[sendMedia] unhandled media type");
	}

	/** Streams message drafts to the current chat, finalizing each completed draft as a sent message.
	 *
	 * Two forms (mirroring {@link SendMixin.streamRichMessage}):
	 * - **Iterable** — pass an Iterable/AsyncIterable of `MessageDraftPiece`; it's drained and the
	 *   array of sent messages is returned.
	 * - **Handle** — call with no iterable to get a {@link MessageDraft}: `append()` pieces and
	 *   `finalize()`, or use `await using` to finalize on scope exit.
	 *
	 * Both use `sendMessageDraft` for live previews and `sendMessage` to finalize each 4096-char segment.
	 *
	 * @example
	 * ```ts
	 * // iterable form
	 * const messages = await context.streamMessage(llmStream);
	 *
	 * // handle form (auto-finalize)
	 * await using draft = context.streamMessage();
	 * for await (const token of llm) draft.append(token);
	 * ```
	 */
	streamMessage(options?: StreamMessageOptions): MessageDraft<Bot>;
	streamMessage(
		stream: Iterable<MessageDraftPiece> | AsyncIterable<MessageDraftPiece>,
		options?: StreamMessageOptions,
	): Promise<MessageContext<Bot>[]>;
	streamMessage(
		first?:
			| StreamMessageOptions
			| Iterable<MessageDraftPiece>
			| AsyncIterable<MessageDraftPiece>,
		maybeOptions?: StreamMessageOptions,
	): MessageDraft<Bot> | Promise<MessageContext<Bot>[]> {
		const isStream =
			!!first &&
			(Symbol.asyncIterator in (first as object) ||
				Symbol.iterator in (first as object));
		const options =
			(isStream ? maybeOptions : (first as StreamMessageOptions)) ?? {};
		const draftIdOffset = options.draftIdOffset ?? 256 * (this.updateId || 0);

		// No iterable → return an `await using` handle (mirrors `streamRichMessage`).
		if (!isStream)
			return new MessageDraft<Bot>(
				this.bot,
				this.chatId || this.senderId || 0,
				options,
				draftIdOffset,
				this.businessConnectionId,
				this.threadId && this.isTopicMessage?.() ? this.threadId : undefined,
			);

		const stream = first as
			| Iterable<MessageDraftPiece>
			| AsyncIterable<MessageDraftPiece>;
		return (async () => {
			const chatId = this.chatId || this.senderId || 0;

		// Build base params for sendMessageDraft, auto-forwarding threadId
		const baseDraftParams: Record<string, unknown> = {
			...options.draftParams,
		};
		if (
			this.threadId &&
			this.isTopicMessage?.() &&
			!baseDraftParams.message_thread_id
		) {
			baseDraftParams.message_thread_id = this.threadId;
		}

		// Build base params for sendMessage, auto-forwarding businessConnectionId and threadId
		const baseMessageParams: Record<string, unknown> = {
			...options.messageParams,
		};
		if (
			this.businessConnectionId &&
			!baseMessageParams.business_connection_id
		) {
			baseMessageParams.business_connection_id = this.businessConnectionId;
		}
		if (
			this.threadId &&
			this.isTopicMessage?.() &&
			!baseMessageParams.message_thread_id
		) {
			baseMessageParams.message_thread_id = this.threadId;
		}

		type Draft = {
			id: number;
			text: string;
			entities: TelegramObjects.TelegramMessageEntity[];
		};

		const outerStream = stream;

		async function* enumerateDrafts(): AsyncGenerator<Draft> {
			let currentDraftId = 0;
			let currentByteCount = 0;
			let currentNegativeEntityOffset = 0;

			for await (const chunk of outerStream) {
				const {
					draft_id,
					text,
					entities = [],
				} = typeof chunk === "string"
					? { text: chunk, draft_id: undefined, entities: [] }
					: chunk;

				const lastDraftId = currentDraftId;
				const addedLength = text.length;

				if (draft_id !== undefined) {
					currentDraftId = draft_id;
				} else if (currentByteCount + addedLength > 4096) {
					currentDraftId++;
				}

				if (lastDraftId === currentDraftId) {
					currentByteCount += addedLength;
				} else {
					currentNegativeEntityOffset += currentByteCount;
					currentByteCount = addedLength;
				}

				yield {
					id: draftIdOffset + currentDraftId,
					text,
					entities: entities.map((e) => ({
						...e,
						offset: e.offset - currentNegativeEntityOffset,
					})),
				};
			}
		}

		// Shared state between producer and consumer
		let latest: Draft | undefined;
		const complete: Draft[] = [];
		let lock: PromiseWithResolvers<void> | undefined;
		let running = true;
		let exhausted = false;
		const { signal } = options;

		// Producer: consume iterator, accumulate drafts, signal consumer
		async function pull() {
			let current: Draft | undefined;
			for await (const draft of enumerateDrafts()) {
				if (!running || signal?.aborted) break;
				if (current === undefined) {
					current = draft;
				} else if (current.id === draft.id) {
					current.text += draft.text;
					current.entities.push(...draft.entities);
				} else {
					complete.push(current);
					current = draft;
				}
				latest = current;
				if (lock !== undefined) {
					lock.resolve();
					lock = undefined;
				}
			}
			if (current !== undefined) {
				complete.push(current);
			}
			exhausted = true;
			if (lock !== undefined) {
				lock.resolve();
				lock = undefined;
			}
		}

		// Consumer: send completed messages and draft previews
		const messages: MessageContext<Bot>[] = [];
		const bot = this.bot;

		async function push() {
			try {
				while (!exhausted || complete.length > 0) {
					let draft: Draft | undefined;

					// Priority 1: completed drafts -> sendMessage
					draft = complete.shift();
					if (draft !== undefined) {
						const response = await bot.api.sendMessage({
							chat_id: chatId,
							text: draft.text,
							entities: draft.entities,
							...baseMessageParams,
						});
						messages.push(
							new MessageContext({
								bot,
								payload: response,
							}),
						);
						continue;
					}

					// Priority 2: in-progress draft -> sendMessageDraft (skippable)
					draft = latest;
					if (draft !== undefined) {
						latest = undefined;
						await bot.api.sendMessageDraft({
							chat_id: chatId,
							draft_id: draft.id,
							text: draft.text,
							entities: draft.entities,
							...baseDraftParams,
						});
						continue;
					}

					// Priority 3: nothing to do -> wait for producer
					lock = Promise.withResolvers();
					await lock.promise;
				}
			} finally {
				running = false;
			}
		}

		await Promise.all([pull(), push()]);
			return messages;
		})();
	}

	/** Returns chat boosts by the user */
	getChatBoosts(userId: number) {
		return this.bot.api.getUserChatBoosts({
			chat_id: this.chatId || this.senderId || 0,
			user_id: userId,
		});
	}
}

interface SendMixin<Bot extends BotLike>
	extends Context<Bot>,
		SendMixinMetadata {}

applyMixins(MessageContext, [SendMixin]);

export { SendMixin };
