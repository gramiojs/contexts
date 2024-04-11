import { inspectable } from "inspectable";

import type { TelegramParams } from "@gramio/types";
import type { TelegramObjects } from "@gramio/types";

import type { Constructor, Require } from "#types";
import { applyMixins, filterPayload } from "#utils";
import { ChosenInlineResult } from "../structures";

import type { BotLike } from "#types";
import { Context } from "./context";
import { ChatActionMixin, CloneMixin, SendMixin } from "./mixins";

interface ChosenInlineResultContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChosenInlineResult;
	updateId: number;
}

/**
 * The result of an inline query that was chosen by
 * a user and sent to their chat partner
 */
class ChosenInlineResultContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramChosenInlineResult;

	constructor(options: ChosenInlineResultContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "chosen_inline_result",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Checks if the result has `location` property */
	hasLocation(): this is Require<this, "location"> {
		return this.location !== undefined;
	}

	/** Checks if the query has `inlineMessageId` property */
	hasInlineMessageId(): this is Require<this, "inlineMessageId"> {
		return this.inlineMessageId !== undefined;
	}

	/** Edits a callback query messages text */
	editText(
		text: TelegramParams.EditMessageTextParams["text"],
		params?: Partial<TelegramParams.EditMessageTextParams>,
	) {
		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without an `inlineMessageId` property",
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
		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without an `inlineMessageId` property",
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
		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without an `inlineMessageId` property",
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
		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without an `inlineMessageId` property",
			);
		}

		return this.bot.api.editMessageLiveLocation({
			inline_message_id: this.inlineMessageId,
			...params,
		});
	}

	/** Stops a callback query messages live location */
	stopLiveLocation(params?: TelegramParams.StopMessageLiveLocationParams) {
		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without an `inlineMessageId` property",
			);
		}

		return this.bot.api.stopMessageLiveLocation({
			inline_message_id: this.inlineMessageId,
			...params,
		});
	}

	/** Edits a callback query messages reply markup */
	editReplyMarkup(
		replyMarkup: TelegramParams.EditMessageReplyMarkupParams["reply_markup"],
		params?: Partial<TelegramParams.EditMessageReplyMarkupParams>,
	) {
		if (!this.hasInlineMessageId()) {
			throw new TypeError(
				"cannot edit a message without an `inlineMessageId` property",
			);
		}

		return this.bot.api.editMessageReplyMarkup({
			inline_message_id: this.inlineMessageId,
			reply_markup: replyMarkup,
			...params,
		});
	}
}

// @ts-expect-error [senderId: number] is not compatible with [senderId: number | undefined] :shrug:
interface ChosenInlineResultContext<Bot extends BotLike>
	extends Constructor<ChosenInlineResultContext<Bot>>,
		ChosenInlineResult,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		CloneMixin<
			Bot,
			ChosenInlineResultContext<Bot>,
			ChosenInlineResultContextOptions<Bot>
		> {}
applyMixins(ChosenInlineResultContext, [
	ChosenInlineResult,
	SendMixin,
	ChatActionMixin,
	CloneMixin,
]);

inspectable(ChosenInlineResultContext, {
	serialize(result) {
		const payload = {
			resultId: result.resultId,
			from: result.from,
			senderId: result.senderId,
			location: result.location,
			inlineMessageId: result.inlineMessageId,
			query: result.query,
		};

		return filterPayload(payload);
	},
});

export { ChosenInlineResultContext };
