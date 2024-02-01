import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";
import * as Params from "@gramio/types/params";

import type { Bot } from "gramio";
import { applyMixins, filterPayload } from "#utils";
import { type Constructor, type Require } from "#utils";
import { ChosenInlineResult } from "../structures";

import { Context } from "./context";
import { ChatActionMixin, CloneMixin, SendMixin } from "./mixins";

interface ChosenInlineResultContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramChosenInlineResult;
	updateId: number;
}

/**
 * The result of an inline query that was chosen by
 * a user and sent to their chat partner
 */
class ChosenInlineResultContext extends Context {
	payload: Interfaces.TelegramChosenInlineResult;

	constructor(options: ChosenInlineResultContextOptions) {
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
		text: Params.EditMessageTextParams["text"],
		params?: Partial<Params.EditMessageTextParams>,
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
		caption: NonNullable<Params.EditMessageCaptionParams["caption"]>,
		params?: Partial<Params.EditMessageCaptionParams>,
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
		media: Params.EditMessageMediaParams["media"],
		params?: Partial<Params.EditMessageMediaParams>,
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
	editLiveLocation(params: Params.EditMessageLiveLocationParams) {
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
	stopLiveLocation(params?: Params.StopMessageLiveLocationParams) {
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
		replyMarkup: Interfaces.TelegramInlineKeyboardMarkup,
		params?: Partial<Params.EditMessageReplyMarkupParams>,
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
interface ChosenInlineResultContext
	extends Constructor<ChosenInlineResultContext>,
		ChosenInlineResult,
		SendMixin,
		ChatActionMixin,
		CloneMixin<ChosenInlineResultContext, ChosenInlineResultContextOptions> {}
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
