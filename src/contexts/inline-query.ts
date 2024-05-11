import { inspectable } from "inspectable";

import type { TelegramParams } from "@gramio/types";
import type { TelegramObjects } from "@gramio/types";

import { InlineQuery } from "../structures/index";
import type { Constructor, Require } from "../types";
import { applyMixins, filterPayload } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import { CloneMixin } from "./mixins/index";

interface InlineQueryContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramInlineQuery;
	updateId: number;
}

/**
 * This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results.
 *
 * [Documentation](https://core.telegram.org/bots/api/#inlinequery)
 */
class InlineQueryContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramInlineQuery;

	constructor(options: InlineQueryContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "inline_query",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Sender's ID */
	get senderId() {
		return this.from.id;
	}

	/** Checks if query has `location` property */
	hasLocation(): this is Require<this, "location"> {
		return this.location !== undefined;
	}

	/** Answers to inline query */
	answerInlineQuery(
		results: TelegramObjects.TelegramInlineQueryResult[],
		params?: Partial<TelegramParams.AnswerInlineQueryParams>,
	) {
		return this.bot.api.answerInlineQuery({
			inline_query_id: this.id,
			results,
			...params,
		});
	}

	/** Answers to inline query. An alias for `answerInlineQuery` */
	answer(
		results: TelegramObjects.TelegramInlineQueryResult[],
		params?: Partial<TelegramParams.AnswerInlineQueryParams>,
	) {
		return this.answerInlineQuery(results, params);
	}
}

interface InlineQueryContext<Bot extends BotLike>
	extends Constructor<InlineQueryContext<Bot>>,
		InlineQuery,
		CloneMixin<Bot, InlineQueryContext<Bot>, InlineQueryContextOptions<Bot>> {}
applyMixins(InlineQueryContext, [InlineQuery, CloneMixin]);

inspectable(InlineQueryContext, {
	serialize(context) {
		const payload = {
			id: context.id,
			senderId: context.senderId,
			from: context.from,
			location: context.location,
			query: context.query,
			offset: context.offset,
		};

		return filterPayload(payload);
	},
});

export { InlineQueryContext };
