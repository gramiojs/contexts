import * as Interfaces from "@gramio/types/objects";
import * as Params from "@gramio/types/params";

import type { MaybeArray, Optional } from "#utils";
import { MessageId } from "../../structures";

import { Context } from "../context";
import { MessageContext } from "../message";
import { SendMixin } from "./send";

interface NodeMixinMetadata {
	get id(): number;
}

/** Construct a type that has `reply_parameters` `Partial` */
type WithPartialReplyParameters<T> = Omit<T, "reply_parameters"> & {
	reply_parameters?: Partial<Interfaces.TelegramReplyParameters>;
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type WithQuote<T = {}> = { quote: string } & T;

/** This object represents a mixin which has `id` field and can invoke `id`-dependent methods */
class NodeMixin {
	/** Replies to current message */
	reply(
		text: Params.SendMessageParams["text"],
		params: WithPartialReplyParameters<
			Optional<Params.SendMessageParams, "chat_id" | "text">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.send(text, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with photo */
	replyWithPhoto(
		photo: Params.SendPhotoParams["photo"],
		params: WithPartialReplyParameters<
			Optional<Params.SendPhotoParams, "chat_id" | "photo">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendPhoto(photo, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with document */
	replyWithDocument(
		document: Params.SendDocumentParams["document"],
		params: WithPartialReplyParameters<
			Optional<Params.SendDocumentParams, "chat_id" | "document">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendDocument(document, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with audio */
	replyWithAudio(
		audio: Params.SendAudioParams["audio"],
		params: WithPartialReplyParameters<
			Optional<Params.SendAudioParams, "chat_id" | "audio">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendAudio(audio, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with video */
	replyWithVideo(
		video: Params.SendVideoParams["video"],
		params: WithPartialReplyParameters<
			Optional<Params.SendVideoParams, "chat_id" | "video">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendVideo(video, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with animation */
	replyWithAnimation(
		animation: Params.SendAnimationParams["animation"],
		params: WithPartialReplyParameters<
			Optional<Params.SendAnimationParams, "chat_id" | "animation">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendAnimation(animation, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with video note */
	replyWithVideoNote(
		videoNote: Params.SendVideoNoteParams["video_note"],
		params: WithPartialReplyParameters<
			Optional<Params.SendVideoNoteParams, "chat_id" | "video_note">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendVideoNote(videoNote, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with voice */
	replyWithVoice(
		voice: Params.SendVoiceParams["voice"],
		params: WithPartialReplyParameters<
			Optional<Params.SendVoiceParams, "chat_id" | "voice">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendVoice(voice, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with media group */
	replyWithMediaGroup(
		mediaGroup: Params.SendMediaGroupParams["media"],
		params: WithPartialReplyParameters<
			Optional<Params.SendMediaGroupParams, "chat_id" | "media">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendMediaGroup(mediaGroup, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with location */
	replyWithLocation(
		latitude: number,
		longitude: number,
		params: WithPartialReplyParameters<
			Optional<Params.SendLocationParams, "chat_id" | "latitude" | "longitude">
		> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendLocation(latitude, longitude, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with invoice */
	// TODO:
	// replyWithInvoice(
	// 	params: WithPartialReplyParameters<
	// 		Optional<Params.SendInvoiceParams, "chat_id">
	// 	>,
	// ) {
	// 	const { reply_parameters, ...rest } = params;

	// 	return this.sendInvoice({
	// 		reply_parameters: {
	// 			message_id: this.id,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** Replies to current message with venue */
	// replyWithVenue(
	// 	params: WithPartialReplyParameters<
	// 		Optional<Params.SendVenueParams, "chat_id">
	// 	>,
	// ) {
	// 	const { reply_parameters, ...rest } = params;

	// 	return this.sendVenue({
	// 		reply_parameters: {
	// 			message_id: this.id,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** Replies to current message with contact */
	// replyWithContact(
	// 	params: WithPartialReplyParameters<
	// 		Optional<Params.SendContactParams, "chat_id">
	// 	>,
	// ) {
	// 	const { reply_parameters, ...rest } = params;

	// 	return this.sendContact({
	// 		reply_parameters: {
	// 			message_id: this.id,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** Replies to current message with poll */
	// replyWithPoll(
	// 	params: WithPartialReplyParameters<
	// 		Optional<Params.SendPollParams, "chat_id">
	// 	>,
	// ) {
	// 	const { reply_parameters, ...rest } = params;

	// 	return this.sendPoll({
	// 		reply_parameters: {
	// 			message_id: this.id,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	/** Replies to current message with sticker */
	replyWithSticker(
		sticker: Params.SendStickerParams["sticker"],
		params: WithPartialReplyParameters<
			Optional<Params.SendStickerParams, "chat_id" | "sticker">
		>,
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendSticker(sticker, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a dice */
	replyWithDice(
		emoji: Params.SendDiceParams["emoji"],
		params: WithPartialReplyParameters<Partial<Params.SendDiceParams>> = {},
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendDice(emoji, {
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote */
	replyWithQuote(
		params: WithQuote<{ text: string }> &
			WithPartialReplyParameters<
				Optional<Params.SendMessageParams, "chat_id" | "text">
			>,
	) {
		const { text, quote, reply_parameters, ...rest } = params;

		return this.reply(text, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a photo */
	quoteWithPhoto(
		params: WithQuote<{ photo: Params.SendPhotoParams["photo"] }> &
			WithPartialReplyParameters<
				Optional<Params.SendPhotoParams, "chat_id" | "photo">
			>,
	) {
		const { photo, quote, reply_parameters, ...rest } = params;

		return this.replyWithPhoto(photo, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a document */
	quoteWithDocument(
		params: WithQuote<{ document: Params.SendDocumentParams["document"] }> &
			WithPartialReplyParameters<
				Optional<Params.SendDocumentParams, "chat_id" | "document">
			>,
	) {
		const { document, quote, reply_parameters, ...rest } = params;

		return this.replyWithDocument(document, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and an audio */
	quoteWithAudio(
		params: WithQuote<{ audio: Params.SendAudioParams["audio"] }> &
			WithPartialReplyParameters<
				Optional<Params.SendAudioParams, "chat_id" | "audio">
			>,
	) {
		const { audio, quote, reply_parameters, ...rest } = params;

		return this.replyWithAudio(audio, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a video */
	quoteWithVideo(
		params: WithQuote<{ video: Params.SendVideoParams["video"] }> &
			WithPartialReplyParameters<
				Optional<Params.SendVideoParams, "chat_id" | "video">
			>,
	) {
		const { video, quote, reply_parameters, ...rest } = params;

		return this.replyWithVideo(video, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and an animation */
	quoteWithAnimation(
		params: WithQuote<{ animation: Params.SendAnimationParams["animation"] }> &
			WithPartialReplyParameters<
				Optional<Params.SendAnimationParams, "chat_id" | "animation">
			>,
	) {
		const { animation, quote, reply_parameters, ...rest } = params;

		return this.replyWithAnimation(animation, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a video note */
	quoteWithVideoNote(
		params: WithQuote<{
			videoNote: Params.SendVideoNoteParams["video_note"];
		}> &
			WithPartialReplyParameters<
				Optional<Params.SendVideoNoteParams, "chat_id" | "video_note">
			>,
	) {
		const { videoNote, quote, reply_parameters, ...rest } = params;

		return this.replyWithVideoNote(videoNote, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a voice */
	quoteWithVoice(
		params: WithQuote<{ voice: Params.SendVoiceParams["voice"] }> &
			WithPartialReplyParameters<
				Optional<Params.SendVoiceParams, "chat_id" | "voice">
			>,
	) {
		const { voice, quote, reply_parameters, ...rest } = params;

		return this.replyWithVoice(voice, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a media group */
	quoteWithMediaGroup(
		params: WithQuote<{ mediaGroup: Params.SendMediaGroupParams["media"] }> &
			WithPartialReplyParameters<
				Optional<Params.SendMediaGroupParams, "chat_id" | "media">
			>,
	) {
		const { mediaGroup, quote, reply_parameters, ...rest } = params;

		return this.replyWithMediaGroup(mediaGroup, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a location */
	quoteWithLocation(
		params: WithQuote<{ latitude: number; longitude: number }> &
			WithPartialReplyParameters<
				Optional<
					Params.SendLocationParams,
					"chat_id" | "latitude" | "longitude"
				>
			>,
	) {
		const { latitude, longitude, quote, reply_parameters, ...rest } = params;

		return this.replyWithLocation(latitude, longitude, {
			reply_parameters: {
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	//TODO:
	// /** Replies to current message with a quote and an invoice */
	// quoteWithInvoice(
	// 	params: WithQuote &
	// 		WithPartialReplyParameters<Optional<Params.SendInvoiceParams, "chat_id">>,
	// ) {
	// 	const { quote, reply_parameters, ...rest } = params;

	// 	return this.replyWithInvoice({
	// 		reply_parameters: {
	// 			quote,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** Replies to current message with a quote and a venue */
	// quoteWithVenue(
	// 	params: WithQuote &
	// 		WithPartialReplyParameters<Optional<Params.SendVenueParams, "chat_id">>,
	// ) {
	// 	const { quote, reply_parameters, ...rest } = params;

	// 	return this.replyWithVenue({
	// 		reply_parameters: {
	// 			quote,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** Replies to current message with a quote and a contact */
	// quoteWithContact(
	// 	params: WithQuote &
	// 		WithPartialReplyParameters<Optional<Params.SendContactParams, "chat_id">>,
	// ) {
	// 	const { quote, reply_parameters, ...rest } = params;

	// 	return this.replyWithContact({
	// 		reply_parameters: {
	// 			quote,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** Replies to current message with a quote and a poll */
	// quoteWithPoll(
	// 	params: WithQuote &
	// 		WithPartialReplyParameters<Optional<Params.SendPollParams, "chat_id">>,
	// ) {
	// 	const { quote, reply_parameters, ...rest } = params;

	// 	return this.replyWithPoll({
	// 		reply_parameters: {
	// 			quote,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** Replies to current message with a quote and a sticker */
	// quoteWithSticker(
	// 	params: WithQuote<{ sticker: Params.SendStickerParams["sticker"] }> &
	// 		WithPartialReplyParameters<
	// 			Optional<Params.SendStickerParams, "chat_id" | "sticker">
	// 		>,
	// ) {
	// 	const { sticker, quote, reply_parameters, ...rest } = params;

	// 	return this.replyWithSticker(sticker, {
	// 		reply_parameters: {
	// 			quote,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** Replies to current message with a quote and a dice */
	// quoteWithDice(
	// 	params: WithQuote<{ emoji: Params.SendDiceParams["emoji"] }> &
	// 		WithPartialReplyParameters<Partial<Params.SendDiceParams>>,
	// ) {
	// 	const { emoji, quote, reply_parameters, ...rest } = params;

	// 	return this.replyWithDice(emoji, {
	// 		reply_parameters: {
	// 			quote,
	// 			...reply_parameters,
	// 		},
	// 		...rest,
	// 	});
	// }

	// /** @deprecated use `delete()` instead */
	// deleteMessage(
	// 	params?: Optional<Params.DeleteMessageParams, "chat_id" | "message_id">,
	// ) {
	// 	return this.delete(params);
	// }

	// /** Deletes current message */
	// delete(
	// 	params: Optional<Params.DeleteMessageParams, "chat_id" | "message_id"> = {},
	// ) {
	// 	return this.bot.api.deleteMessage({
	// 		chat_id: this.chatId || this.senderId || 0,
	// 		message_id: this.id,
	// 		...params,
	// 	});
	// }

	/** Edits current message live location */
	async editMessageLiveLocation(params: Params.EditMessageLiveLocationParams) {
		const response = await this.bot.api.editMessageLiveLocation({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			...params,
		});

		if (response === true) {
			return true;
		}

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Edits current message live location. An alias for `editMessageLiveLocation` */
	editLiveLocation(params: Params.EditMessageLiveLocationParams) {
		return this.editMessageLiveLocation(params);
	}

	/** Stops current message live location */
	async stopMessageLiveLocation(params?: Params.StopMessageLiveLocationParams) {
		const response = await this.bot.api.stopMessageLiveLocation({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			...params,
		});

		if (response === true) {
			return true;
		}

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Stops current message live location. An alias for `stopMessageLiveLocation` */
	stopLiveLocation(params?: Params.StopMessageLiveLocationParams) {
		return this.stopMessageLiveLocation(params);
	}

	/** Edits current message text */
	async editMessageText(
		text: Params.EditMessageTextParams["text"],
		params?: Partial<Params.EditMessageTextParams>,
	) {
		const response = await this.bot.api.editMessageText({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			text,
			...params,
		});

		if (response === true) {
			return true;
		}

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Edits current message text. An alias for `editMessageText` */
	editText(
		text: Params.EditMessageTextParams["text"],
		params?: Partial<Params.EditMessageTextParams>,
	) {
		return this.editMessageText(text, params);
	}

	/** Edits current message caption */
	async editMessageCaption(
		caption: NonNullable<Params.EditMessageCaptionParams["caption"]>,
		params?: Partial<Params.EditMessageCaptionParams>,
	) {
		const response = await this.bot.api.editMessageCaption({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			caption,
			...params,
		});

		if (response === true) {
			return true;
		}

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Edits current message caption. An alias for `editMessageCaption` */
	editCaption(
		caption: NonNullable<Params.EditMessageCaptionParams["caption"]>,
		params?: Partial<Params.EditMessageCaptionParams>,
	) {
		return this.editMessageCaption(caption, params);
	}

	/** Edits current message media */
	async editMessageMedia(
		media: Params.EditMessageMediaParams["media"],
		params?: Partial<Params.EditMessageMediaParams>,
	) {
		const response = await this.bot.api.editMessageMedia({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			media,
			...params,
		});

		if (response === true) {
			return true;
		}

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Edits current message media. An alias for `editMessageMedia` */
	editMedia(
		media: Params.EditMessageMediaParams["media"],
		params?: Partial<Params.EditMessageMediaParams>,
	) {
		return this.editMessageMedia(media, params);
	}

	/** Edits current message reply markup */
	async editMessageReplyMarkup(
		replyMarkup: Interfaces.TelegramInlineKeyboardMarkup,
		params?: Partial<Params.EditMessageReplyMarkupParams>,
	) {
		const response = await this.bot.api.editMessageReplyMarkup({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			reply_markup: replyMarkup,
			...params,
		});

		if (response === true) {
			return true;
		}

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Edits current message reply markup. An alias for `editMessageReplyMarkup` */
	editReplyMarkup(
		replyMarkup: Interfaces.TelegramInlineKeyboardMarkup,
		params?: Partial<Params.EditMessageReplyMarkupParams>,
	) {
		return this.editMessageReplyMarkup(replyMarkup, params);
	}

	/** Copies current message [into other chat if `chatId` is provided] */
	async copy(
		params: Optional<
			Params.CopyMessageParams,
			"chat_id" | "from_chat_id" | "message_id"
		> = {},
	) {
		const response = await this.bot.api.copyMessage({
			chat_id: this.chatId || this.senderId || 0,
			from_chat_id: this.chatId || 0,
			message_id: this.id,
			...params,
		});

		return new MessageId(response);
	}

	/** Forwards current message [into other chat if `chatId` is provided] */
	async forward(
		params: Optional<
			Params.ForwardMessageParams,
			"chat_id" | "from_chat_id" | "message_id"
		> = {},
	) {
		const response = await this.bot.api.forwardMessage({
			chat_id: this.chatId || this.senderId || 0,
			from_chat_id: this.chatId || 0,
			message_id: this.id,
			...params,
		});

		return new MessageContext({
			bot: this.bot,
			payload: response,
		});
	}

	/** Sets a reaction on a message */
	setReaction(
		reaction:
			| Interfaces.TelegramReactionTypeEmoji["emoji"]
			| Interfaces.TelegramReactionType,
		params: Optional<
			Params.SetMessageReactionParams,
			"chat_id" | "message_id"
		> = {},
	) {
		return this.bot.api.setMessageReaction({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			reaction: [
				typeof reaction === "string"
					? {
							type: "emoji",
							emoji: reaction,
					  }
					: reaction,
			],
			...params,
		});
	}

	/** Sets multiple amount of reactions on a message */
	setReactions(
		rawReactions: (
			| Interfaces.TelegramReactionTypeEmoji["emoji"]
			| Interfaces.TelegramReactionType
		)[],
		params: Optional<
			Params.SetMessageReactionParams,
			"chat_id" | "message_id"
		> = {},
	) {
		const reactions = rawReactions.map((r) =>
			typeof r === "string"
				? ({ type: "emoji", emoji: r } as Interfaces.TelegramReactionTypeEmoji)
				: r,
		);

		return this.bot.api.setMessageReaction({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			reaction: reactions,
			...params,
		});
	}

	/** Reacts to a message */
	react(
		rawReactions: MaybeArray<
			| Interfaces.TelegramReactionTypeEmoji["emoji"]
			| Interfaces.TelegramReactionType
		>,
		params: Optional<
			Params.SetMessageReactionParams,
			"chat_id" | "message_id"
		> = {},
	) {
		const reactions = (
			Array.isArray(rawReactions) ? rawReactions : [rawReactions]
		).map((r) =>
			typeof r === "string"
				? ({ type: "emoji", emoji: r } as Interfaces.TelegramReactionTypeEmoji)
				: r,
		);

		return this.bot.api.setMessageReaction({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			reaction: reactions,
			...params,
		});
	}

	/** Clears reactions from the message */
	clearReactions(
		params: Optional<
			Params.SetMessageReactionParams,
			"chat_id" | "message_id"
		> = {},
	) {
		return this.bot.api.setMessageReaction({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			...params,
		});
	}
}

interface NodeMixin extends Context, NodeMixinMetadata, SendMixin {}

export { NodeMixin };
