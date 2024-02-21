// eslint-disable-next-line max-classes-per-file
import { inspectable } from "inspectable";

import { applyMixins, filterPayload, isParsable, memoizeGetters } from "#utils";

import { type Constructor, type Require } from "#utils";
import { CallbackQuery } from "../structures";

import { TelegramParams } from "@gramio/types";
import { TelegramObjects } from "@gramio/types";

import { BotLike } from "#types";
import { Context } from "./context";
import { MessageContext } from "./message";
import { CloneMixin } from "./mixins";

interface CallbackQueryContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramCallbackQuery;
	updateId: number;
}

/** Called when `callback_query` event occurs */
class CallbackQueryContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramCallbackQuery;

	constructor(options: CallbackQueryContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "callback_query",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Checks if the query has `message` property */
	hasMessage(): this is Require<this, "message"> {
		return this.payload.message !== undefined;
	}

	/**
	 * Message with the callback button that originated the query.
	 * Note that message content and message date will not be available
	 * if the message is too old
	 */
	get message() {
		if (this.payload.message === undefined) return undefined;

		return new MessageContext({
			bot: this.bot,
			update: this.update,
			payload: this.payload.message,
			updateId: this.update?.update_id,
		});
	}

	/** Checks if the query has `queryPayload` property */
	hasQueryPayload(): this is Require<this, "queryPayload"> {
		return this.payload.data !== undefined;
	}

	/**
	 * Data associated with the callback button.
	 * Be aware that a bad client can send arbitrary data in this field.
	 */
	get queryPayload(): unknown {
		const { data } = this.payload;

		if (data === undefined) return undefined;

		if (isParsable(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	/** Checks if the query has `inlineMessageId` property */
	hasInlineMessageId(): this is Require<this, "inlineMessageId"> {
		return this.inlineMessageId !== undefined;
	}

	/** Checks if the query has `data` property */
	hasData(): this is Require<this, "data"> {
		return this.data !== undefined;
	}

	/** Checks if the query has `gameShortName` property */
	hasGameShortName(): this is Require<this, "gameShortName"> {
		return this.gameShortName !== undefined;
	}

	/** Answers to current callback query */
	answerCallbackQuery(
		params?: Partial<TelegramParams.AnswerCallbackQueryParams>,
	) {
		return this.bot.api.answerCallbackQuery({
			callback_query_id: this.id,
			...params,
		});
	}

	/** Sets the result of an interaction with a Web App and sends a corresponding message  */
	answerWebAppQuery(params: TelegramParams.AnswerWebAppQueryParams) {
		return this.bot.api.answerWebAppQuery(params);
	}

	/** Answers to current callback query. An alias for `answerCallbackQuery` */
	answer(params?: Partial<TelegramParams.AnswerCallbackQueryParams>) {
		return this.answerCallbackQuery(params);
	}

	/** Edits a callback query messages text */
	editText(
		text: TelegramParams.EditMessageTextParams["text"],
		params?: Partial<TelegramParams.EditMessageTextParams>,
	) {
		if (this.hasMessage()) {
			return this.message.editText(text, params);
		}

		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without `message` and `inlineMessageId` properties",
			);
		}

		return this.bot.api.editMessageText({
			inline_message_id: this.inlineMessageId,
			text,
			...params,
		});
	}

	/** Edits a callback query messages caption */
	editCaption(
		caption: NonNullable<TelegramParams.EditMessageCaptionParams["caption"]>,
		params?: Partial<TelegramParams.EditMessageCaptionParams>,
	) {
		if (this.hasMessage()) {
			return this.message.editCaption(caption, params);
		}

		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without `message` and `inlineMessageId` properties",
			);
		}

		return this.bot.api.editMessageCaption({
			inline_message_id: this.inlineMessageId,
			caption,
			...params,
		});
	}

	/** Edits a callback query messages media */
	editMedia(
		media: TelegramParams.EditMessageMediaParams["media"],
		params?: Partial<TelegramParams.EditMessageMediaParams>,
	) {
		if (this.hasMessage()) {
			return this.message.editMedia(media, params);
		}

		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without `message` and `inlineMessageId` properties",
			);
		}

		return this.bot.api.editMessageMedia({
			inline_message_id: this.inlineMessageId,
			media,
			...params,
		});
	}

	/** Edits a callback query messages live location */
	editLiveLocation(params: TelegramParams.EditMessageLiveLocationParams) {
		if (this.hasMessage()) {
			return this.message.editLiveLocation(params);
		}

		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without `message` and `inlineMessageId` properties",
			);
		}

		return this.bot.api.editMessageLiveLocation({
			inline_message_id: this.inlineMessageId,
			...params,
		});
	}

	/** Stops a callback query messages live location */
	stopLiveLocation(params?: TelegramParams.StopMessageLiveLocationParams) {
		if (this.hasMessage()) {
			return this.message.stopLiveLocation(params);
		}

		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without `message` and `inlineMessageId` properties",
			);
		}

		return this.bot.api.stopMessageLiveLocation({
			inline_message_id: this.inlineMessageId,
			...params,
		});
	}

	/** Edits a callback query messages reply markup */
	editReplyMarkup(
		replyMarkup: TelegramObjects.TelegramInlineKeyboardMarkup,
		params?: Partial<TelegramParams.EditMessageReplyMarkupParams>,
	) {
		if (this.hasMessage()) {
			return this.message.editReplyMarkup(replyMarkup, params);
		}

		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without `message` and `inlineMessageId` properties",
			);
		}

		return this.bot.api.editMessageReplyMarkup({
			inline_message_id: this.inlineMessageId,
			reply_markup: replyMarkup,
			...params,
		});
	}
}

interface CallbackQueryContext<Bot extends BotLike>
	extends Constructor<CallbackQueryContext<Bot>>,
		CallbackQuery,
		CloneMixin<
			Bot,
			CallbackQueryContext<Bot>,
			CallbackQueryContextOptions<Bot>
		> {}
applyMixins(CallbackQueryContext, [CallbackQuery, CloneMixin]);
memoizeGetters(CallbackQueryContext, ["message"]);

inspectable(CallbackQueryContext, {
	serialize(context) {
		const payload = {
			id: context.id,
			senderId: context.senderId,
			from: context.from,
			message: context.message,
			inlineMessageId: context.inlineMessageId,
			chatInstance: context.chatInstance,
			queryPayload: context.queryPayload,
			gameShortName: context.gameShortName,
		};

		return filterPayload(payload);
	},
});

export { CallbackQueryContext };
