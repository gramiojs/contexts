import type { TelegramParams } from "@gramio/types";
import type { TelegramObjects } from "@gramio/types";

import { MessageId } from "../../structures/index";
import type { MaybeArray, Optional } from "../../types";

import type { BotLike } from "../../types";
import type { Context } from "../context";
import { MessageContext } from "../message";
import type { SendMixin } from "./send";

interface NodeMixinMetadata {
	get id(): number;
}

/** Construct a type that has `reply_parameters` `Partial` */
type WithPartialReplyParameters<T> = T & {
	reply_parameters?: Partial<TelegramObjects.TelegramReplyParameters>;
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type WithQuote<T = {}> = { quote: string } & T;

/** This object represents a mixin which has `id` field and can invoke `id`-dependent methods */
class NodeMixin<Bot extends BotLike> {
	/** Replies to current message */
	reply(
		text: TelegramParams.SendMessageParams["text"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendMessageParams, "chat_id" | "text">
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
		photo: TelegramParams.SendPhotoParams["photo"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendPhotoParams, "chat_id" | "photo">
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
		document: TelegramParams.SendDocumentParams["document"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendDocumentParams, "chat_id" | "document">
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
		audio: TelegramParams.SendAudioParams["audio"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendAudioParams, "chat_id" | "audio">
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
		video: TelegramParams.SendVideoParams["video"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendVideoParams, "chat_id" | "video">
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
		animation: TelegramParams.SendAnimationParams["animation"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendAnimationParams, "chat_id" | "animation">
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
		videoNote: TelegramParams.SendVideoNoteParams["video_note"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendVideoNoteParams, "chat_id" | "video_note">
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
		voice: TelegramParams.SendVoiceParams["voice"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendVoiceParams, "chat_id" | "voice">
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
		mediaGroup: TelegramParams.SendMediaGroupParams["media"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendMediaGroupParams, "chat_id" | "media">
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
			Optional<
				TelegramParams.SendLocationParams,
				"chat_id" | "latitude" | "longitude"
			>
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
	replyWithInvoice(
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendInvoiceParams, "chat_id">
		>,
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendInvoice({
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with venue */
	replyWithVenue(
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendVenueParams, "chat_id">
		>,
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendVenue({
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with contact */
	replyWithContact(
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendContactParams, "chat_id">
		>,
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendContact({
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with poll */
	replyWithPoll(
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendPollParams, "chat_id">
		>,
	) {
		const { reply_parameters, ...rest } = params;

		return this.sendPoll({
			reply_parameters: {
				message_id: this.id,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with sticker */
	replyWithSticker(
		sticker: TelegramParams.SendStickerParams["sticker"],
		params: WithPartialReplyParameters<
			Optional<TelegramParams.SendStickerParams, "chat_id" | "sticker">
		> = {},
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
		emoji: TelegramParams.SendDiceParams["emoji"],
		params: WithPartialReplyParameters<
			Partial<TelegramParams.SendDiceParams>
		> = {},
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
				Optional<TelegramParams.SendMessageParams, "chat_id" | "text">
			>,
	) {
		const { text, quote, reply_parameters, ...rest } = params;

		return this.reply(text, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a photo */
	quoteWithPhoto(
		params: WithQuote<{ photo: TelegramParams.SendPhotoParams["photo"] }> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendPhotoParams, "chat_id" | "photo">
			>,
	) {
		const { photo, quote, reply_parameters, ...rest } = params;

		return this.replyWithPhoto(photo, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a document */
	quoteWithDocument(
		params: WithQuote<{
			document: TelegramParams.SendDocumentParams["document"];
		}> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendDocumentParams, "chat_id" | "document">
			>,
	) {
		const { document, quote, reply_parameters, ...rest } = params;

		return this.replyWithDocument(document, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and an audio */
	quoteWithAudio(
		params: WithQuote<{ audio: TelegramParams.SendAudioParams["audio"] }> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendAudioParams, "chat_id" | "audio">
			>,
	) {
		const { audio, quote, reply_parameters, ...rest } = params;

		return this.replyWithAudio(audio, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a video */
	quoteWithVideo(
		params: WithQuote<{ video: TelegramParams.SendVideoParams["video"] }> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendVideoParams, "chat_id" | "video">
			>,
	) {
		const { video, quote, reply_parameters, ...rest } = params;

		return this.replyWithVideo(video, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and an animation */
	quoteWithAnimation(
		params: WithQuote<{
			animation: TelegramParams.SendAnimationParams["animation"];
		}> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendAnimationParams, "chat_id" | "animation">
			>,
	) {
		const { animation, quote, reply_parameters, ...rest } = params;

		return this.replyWithAnimation(animation, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a video note */
	quoteWithVideoNote(
		params: WithQuote<{
			videoNote: TelegramParams.SendVideoNoteParams["video_note"];
		}> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendVideoNoteParams, "chat_id" | "video_note">
			>,
	) {
		const { videoNote, quote, reply_parameters, ...rest } = params;

		return this.replyWithVideoNote(videoNote, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a voice */
	quoteWithVoice(
		params: WithQuote<{ voice: TelegramParams.SendVoiceParams["voice"] }> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendVoiceParams, "chat_id" | "voice">
			>,
	) {
		const { voice, quote, reply_parameters, ...rest } = params;

		return this.replyWithVoice(voice, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a media group */
	quoteWithMediaGroup(
		params: WithQuote<{
			mediaGroup: TelegramParams.SendMediaGroupParams["media"];
		}> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendMediaGroupParams, "chat_id" | "media">
			>,
	) {
		const { mediaGroup, quote, reply_parameters, ...rest } = params;

		return this.replyWithMediaGroup(mediaGroup, {
			reply_parameters: {
				message_id: this.id,
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
					TelegramParams.SendLocationParams,
					"chat_id" | "latitude" | "longitude"
				>
			>,
	) {
		const { latitude, longitude, quote, reply_parameters, ...rest } = params;

		return this.replyWithLocation(latitude, longitude, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and an invoice */
	quoteWithInvoice(
		params: WithQuote &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendInvoiceParams, "chat_id">
			>,
	) {
		const { quote, reply_parameters, ...rest } = params;

		return this.replyWithInvoice({
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a venue */
	quoteWithVenue(
		params: WithQuote &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendVenueParams, "chat_id">
			>,
	) {
		const { quote, reply_parameters, ...rest } = params;

		return this.replyWithVenue({
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a contact */
	quoteWithContact(
		params: WithQuote &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendContactParams, "chat_id">
			>,
	) {
		const { quote, reply_parameters, ...rest } = params;

		return this.replyWithContact({
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a poll */
	quoteWithPoll(
		params: WithQuote &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendPollParams, "chat_id">
			>,
	) {
		const { quote, reply_parameters, ...rest } = params;

		return this.replyWithPoll({
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a sticker */
	quoteWithSticker(
		params: WithQuote<{
			sticker: TelegramParams.SendStickerParams["sticker"];
		}> &
			WithPartialReplyParameters<
				Optional<TelegramParams.SendStickerParams, "chat_id" | "sticker">
			>,
	) {
		const { sticker, quote, reply_parameters, ...rest } = params;

		return this.replyWithSticker(sticker, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Replies to current message with a quote and a dice */
	quoteWithDice(
		params: WithQuote<{ emoji: TelegramParams.SendDiceParams["emoji"] }> &
			WithPartialReplyParameters<Partial<TelegramParams.SendDiceParams>>,
	) {
		const { emoji, quote, reply_parameters, ...rest } = params;

		return this.replyWithDice(emoji, {
			reply_parameters: {
				message_id: this.id,
				quote,
				...reply_parameters,
			},
			...rest,
		});
	}

	/** Deletes current message */
	delete(
		params: Optional<
			TelegramParams.DeleteMessageParams,
			"chat_id" | "message_id"
		> = {},
	) {
		return this.bot.api.deleteMessage({
			chat_id: this.chatId || this.senderId || 0,
			message_id: this.id,
			...params,
		});
	}

	/** Deletes messages in current chat */
	deleteMessages(ids: TelegramParams.DeleteMessagesParams["message_ids"]) {
		return this.bot.api.deleteMessages({
			chat_id: this.chatId || this.senderId || 0,
			message_ids: ids,
		});
	}

	/** Edits current message live location */
	async editMessageLiveLocation(
		params: TelegramParams.EditMessageLiveLocationParams,
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;

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
	editLiveLocation(params: TelegramParams.EditMessageLiveLocationParams) {
		return this.editMessageLiveLocation(params);
	}

	/** Stops current message live location */
	async stopMessageLiveLocation(
		params?: TelegramParams.StopMessageLiveLocationParams,
	) {
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
	stopLiveLocation(params?: TelegramParams.StopMessageLiveLocationParams) {
		return this.stopMessageLiveLocation(params);
	}

	/** Edits current message text */
	async editMessageText(
		text: TelegramParams.EditMessageTextParams["text"],
		params: Partial<TelegramParams.EditMessageTextParams> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;

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
		text: TelegramParams.EditMessageTextParams["text"],
		params?: Partial<TelegramParams.EditMessageTextParams>,
	) {
		return this.editMessageText(text, params);
	}

	/** Edits current message caption */
	async editMessageCaption(
		caption: NonNullable<TelegramParams.EditMessageCaptionParams["caption"]>,
		params: Partial<TelegramParams.EditMessageCaptionParams> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;

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
		caption: NonNullable<TelegramParams.EditMessageCaptionParams["caption"]>,
		params?: Partial<TelegramParams.EditMessageCaptionParams>,
	) {
		return this.editMessageCaption(caption, params);
	}

	/** Edits current message media */
	async editMessageMedia(
		media: TelegramParams.EditMessageMediaParams["media"],
		params: Partial<TelegramParams.EditMessageMediaParams> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;

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
		media: TelegramParams.EditMessageMediaParams["media"],
		params?: Partial<TelegramParams.EditMessageMediaParams>,
	) {
		return this.editMessageMedia(media, params);
	}

	/** Edits current message reply markup */
	async editMessageReplyMarkup(
		replyMarkup: TelegramParams.EditMessageReplyMarkupParams["reply_markup"],
		params: Partial<TelegramParams.EditMessageReplyMarkupParams> = {},
	) {
		if (this.businessConnectionId && !params.business_connection_id)
			params.business_connection_id = this.businessConnectionId;

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
		replyMarkup: TelegramParams.EditMessageReplyMarkupParams["reply_markup"],
		params?: Partial<TelegramParams.EditMessageReplyMarkupParams>,
	) {
		return this.editMessageReplyMarkup(replyMarkup, params);
	}

	/** Copies current message [into other chat if `chatId` is provided] */
	async copy(
		params: Optional<
			TelegramParams.CopyMessageParams,
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

	/** Copies messages from current chat and sends to another */
	async copyMessages(
		chatId: TelegramParams.CopyMessagesParams["chat_id"],
		ids: TelegramParams.CopyMessagesParams["message_ids"],
		params: Optional<
			TelegramParams.CopyMessagesParams,
			"chat_id" | "from_chat_id" | "message_ids"
		> = {},
	) {
		const response = await this.bot.api.copyMessages({
			chat_id: chatId,
			from_chat_id: this.chatId || this.senderId || 0,
			message_ids: ids,
			...params,
		});

		return response.map((x) => new MessageId(x));
	}

	/** Forwards current message [into other chat if `chatId` is provided] */
	async forward(
		params: Optional<
			TelegramParams.ForwardMessageParams,
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

	/** Forwards messages from current chat to another */
	async forwardMessages(
		chatId: TelegramParams.ForwardMessagesParams["chat_id"],
		ids: TelegramParams.ForwardMessagesParams["message_ids"],
		params: Optional<
			TelegramParams.ForwardMessagesParams,
			"chat_id" | "from_chat_id" | "message_ids"
		> = {},
	) {
		const messages = await this.bot.api.forwardMessages({
			chat_id: chatId,
			from_chat_id: this.chatId || this.senderId || 0,
			message_ids: ids,
			...params,
		});

		return messages.map((x) => new MessageId(x));
	}

	/** Sets a reaction on a message */
	setReaction(
		reaction:
			| TelegramObjects.TelegramReactionTypeEmoji["emoji"]
			| TelegramObjects.TelegramReactionType,
		params: Optional<
			TelegramParams.SetMessageReactionParams,
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
			| TelegramObjects.TelegramReactionTypeEmoji["emoji"]
			| TelegramObjects.TelegramReactionType
		)[],
		params: Optional<
			TelegramParams.SetMessageReactionParams,
			"chat_id" | "message_id"
		> = {},
	) {
		const reactions = rawReactions.map((r) =>
			typeof r === "string"
				? ({
						type: "emoji",
						emoji: r,
					} as TelegramObjects.TelegramReactionTypeEmoji)
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
			| TelegramObjects.TelegramReactionTypeEmoji["emoji"]
			| TelegramObjects.TelegramReactionType
		>,
		params: Optional<
			TelegramParams.SetMessageReactionParams,
			"chat_id" | "message_id"
		> = {},
	) {
		const reactions = (
			Array.isArray(rawReactions) ? rawReactions : [rawReactions]
		).map((r) =>
			typeof r === "string"
				? ({
						type: "emoji",
						emoji: r,
					} as TelegramObjects.TelegramReactionTypeEmoji)
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
			TelegramParams.SetMessageReactionParams,
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

interface NodeMixin<Bot extends BotLike>
	extends Context<Bot>,
		NodeMixinMetadata,
		SendMixin<Bot> {}

export { NodeMixin };
