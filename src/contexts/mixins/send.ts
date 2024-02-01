import * as Params from "@gramio/types/params";

import type { Optional, tSendMethods } from "#utils";
import { Poll } from "../../structures";

import { Context } from "../context";
import { MessageContext } from "../message";

interface SendMixinMetadata {
	get chatId(): number;
	get senderId(): number | undefined;
}

/** This object represents a mixin which can invoke `chatId`/`senderId`-dependent methods */
class SendMixin {
	/** Sends message to current chat */
	async send(
		text: Params.SendMessageParams["text"],
		params?: Optional<Params.SendMessageParams, "chat_id" | "text">,
	) {
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
		photo: Params.SendPhotoParams["photo"],
		params?: Optional<Params.SendPhotoParams, "chat_id" | "photo">,
	) {
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
		document: Params.SendDocumentParams["document"],
		params?: Optional<Params.SendDocumentParams, "chat_id" | "document">,
	) {
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
		audio: Params.SendAudioParams["audio"],
		params?: Optional<Params.SendAudioParams, "chat_id" | "audio">,
	) {
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
		video: Params.SendVideoParams["video"],
		params?: Optional<Params.SendVideoParams, "chat_id" | "video">,
	) {
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
		animation: Params.SendAnimationParams["animation"],
		params?: Optional<Params.SendAnimationParams, "chat_id" | "animation">,
	) {
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
		videoNote: Params.SendVideoNoteParams["video_note"],
		params?: Optional<Params.SendVideoNoteParams, "chat_id" | "video_note">,
	) {
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
		voice: Params.SendVoiceParams["voice"],
		params?: Optional<Params.SendVoiceParams, "chat_id" | "voice">,
	) {
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
		params?: Optional<
			Params.SendLocationParams,
			"chat_id" | "latitude" | "longitude"
		>,
	) {
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
	async sendInvoice(params: Optional<Params.SendInvoiceParams, "chat_id">) {
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
	async sendVenue(params: Optional<Params.SendVenueParams, "chat_id">) {
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
	async sendContact(params: Optional<Params.SendContactParams, "chat_id">) {
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
	async sendPoll(params: Optional<Params.SendPollParams, "chat_id">) {
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
		sticker: Params.SendStickerParams["sticker"],
		params?: Optional<Params.SendStickerParams, "sticker" | "chat_id">,
	) {
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
	async stopPoll(messageId: number, params?: Partial<Params.StopPollParams>) {
		const response = await this.bot.api.stopPoll({
			chat_id: this.chatId || this.senderId || 0,
			message_id: messageId,
			...params,
		});

		return new Poll(response);
	}

	/** Sends chat action to current chat */
	sendChatAction(
		action: Params.SendChatActionParams["action"],
		params: Optional<Params.SendChatActionParams, "chat_id" | "action"> = {},
	) {
		return this.bot.api.sendChatAction({
			chat_id: this.chatId || this.senderId || 0,
			action,
			...params,
		});
	}

	/** Sends dice */
	async sendDice(
		emoji: Params.SendDiceParams["emoji"],
		params?: Partial<Params.SendDiceParams>,
	) {
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
		mediaGroup: Params.SendMediaGroupParams["media"],
		params?: Optional<Params.SendMediaGroupParams, "chat_id" | "media">,
	) {
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
	 *   photo: MediaSource.path('./image.png'),
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

	sendMedia<T extends { type: string }>(
		media: T,
	): ReturnType<
		T extends { type: "animation" }
			? typeof this.sendAnimation
			: T extends { type: "audio" }
			  ? typeof this.sendAudio
			  : T extends { type: "document" }
				  ? typeof this.sendDocument
				  : T extends { type: "photo" }
					  ? typeof this.sendPhoto
					  : T extends { type: "sticker" }
						  ? typeof this.sendSticker
						  : T extends { type: "video_note" }
							  ? typeof this.sendVideoNote
							  : T extends { type: "video" }
								  ? typeof this.sendVideo
								  : T extends { type: "voice" }
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

interface SendMixin extends Context, SendMixinMetadata {}

export { SendMixin };
