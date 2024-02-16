import { inspectable } from "inspectable";

import { TelegramParams } from "@gramio/types";
import { TelegramObjects } from "@gramio/types";

import type { Bot } from "gramio";
import { applyMixins, filterPayload } from "#utils";
import type { Constructor, Require } from "#utils";
import { InlineQuery } from "../structures";

import { Context } from "./context";
import { CloneMixin } from "./mixins";

interface InlineQueryContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramInlineQuery;
	updateId: number;
}

class InlineQueryContext extends Context {
	payload: TelegramObjects.TelegramInlineQuery;

	constructor(options: InlineQueryContextOptions) {
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

interface InlineQueryContext
	extends Constructor<InlineQueryContext>,
		InlineQuery,
		CloneMixin<InlineQueryContext, InlineQueryContextOptions> {}
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
