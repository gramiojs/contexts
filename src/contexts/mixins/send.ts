import type { TelegramParams } from "@gramio/types";

import { Poll } from "../../structures/index";
import type { Optional, tSendMethods } from "../../types";

import type { BotLike } from "../../types";
import type { Context } from "../context";
import { MessageContext } from "../message";

interface SendMixinMetadata {
	get chatId(): number;
	get businessConnectionId(): string | undefined;
	get senderId(): number | undefined;
	get threadId(): number | undefined;
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		params?: Partial<TelegramParams.StopPollParams>,
	) {
		const response = await this.bot.api.stopPoll({
			chat_id: this.chatId || this.senderId || 0,
			message_id: messageId,
			...params,
		});

		return new Poll(response);
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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
		if (this.threadId && !params.message_thread_id)
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

export { SendMixin };
