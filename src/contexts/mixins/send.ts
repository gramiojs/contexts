import type { TelegramObjects, TelegramParams } from "@gramio/types";

import { Poll } from "../../structures/index";
import type {
	BotLike,
	MessageDraftPiece,
	Optional,
	StreamMessageOptions,
	tSendMethods,
} from "../../types";

import { applyMixins } from "utils";
import type { Context } from "../context";
import { MessageContext } from "../message";

interface SendMixinMetadata {
	get chatId(): number;
	get businessConnectionId(): string | undefined;
	get senderId(): number | undefined;
	get threadId(): number | undefined;
	isTopicMessage: (() => boolean);
}

/** This object represents a mixin which can invoke `chatId`/`senderId`-dependent methods */
class SendMixin<Bot extends BotLike> {
	/** Sends message to current chat */
	async send(
		text: TelegramParams.SendMessageParams["text"],
		params: Optional<TelegramParams.SendMessageParams, "chat_id" | "text"> = {},
	) {
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
	 * Accepts an Iterable or AsyncIterable of MessageDraftPiece (strings or objects with text+entities).
	 * Uses sendMessageDraft for live typing previews and sendMessage to finalize each 4096-char segment.
	 * Returns an array of sent MessageContext objects.
	 *
	 * @example
	 * ```ts
	 * // Stream from an async generator (e.g., LLM output)
	 * const messages = await context.streamMessage(llmStream);
	 * ```
	 */
	async streamMessage(
		stream: Iterable<MessageDraftPiece> | AsyncIterable<MessageDraftPiece>,
		options: StreamMessageOptions = {},
	): Promise<MessageContext<Bot>[]> {
		const chatId = this.chatId || this.senderId || 0;
		const draftIdOffset = options.draftIdOffset ?? 256 * (this.updateId || 0);

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
		let latest: Draft | undefined = undefined;
		const complete: Draft[] = [];
		let lock: PromiseWithResolvers<void> | undefined = undefined;
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
