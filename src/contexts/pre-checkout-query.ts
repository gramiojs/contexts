import { inspectable } from "inspectable";

import type { TelegramParams } from "@gramio/types";
import type { TelegramObjects } from "@gramio/types";

import { PreCheckoutQuery } from "../structures";
import type { Constructor, Optional, Require } from "../types";
import { applyMixins, filterPayload } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import { ChatActionMixin, CloneMixin, SendMixin } from "./mixins/index";

interface PreCheckoutQueryContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramPreCheckoutQuery;
	updateId: number;
}

class PreCheckoutQueryContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramPreCheckoutQuery;

	constructor(options: PreCheckoutQueryContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "pre_checkout_query",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Checks if the query has `shippingOptionId` property */
	hasShippingOptionId(): this is Require<this, "shippingOptionId"> {
		return this.shippingOptionId !== undefined;
	}

	/** Checks if the query has `orderInfo` property */
	hasOrderInfo(): this is Require<this, "orderInfo"> {
		return this.orderInfo !== undefined;
	}

	/** Answers to the pending pre-checkout query */
	answerPreCheckoutQuery(
		params: Optional<
			TelegramParams.AnswerPreCheckoutQueryParams,
			"pre_checkout_query_id"
		>,
	) {
		return this.bot.api.answerPreCheckoutQuery({
			pre_checkout_query_id: this.id,
			...params,
		});
	}

	/** Answers to the pending pre-checkout query. An alias for `answerPreCheckoutQuery` */
	answer(
		params: Optional<
			TelegramParams.AnswerPreCheckoutQueryParams,
			"pre_checkout_query_id"
		>,
	) {
		return this.answerPreCheckoutQuery(params);
	}
}

// @ts-expect-error [senderId: number] is not compatible with [senderId: number | undefined] :shrug:
interface PreCheckoutQueryContext<Bot extends BotLike>
	extends Constructor<PreCheckoutQueryContext<Bot>>,
		PreCheckoutQuery,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		CloneMixin<
			Bot,
			PreCheckoutQueryContext<Bot>,
			PreCheckoutQueryContextOptions<Bot>
		> {}
applyMixins(PreCheckoutQueryContext, [
	PreCheckoutQuery,
	SendMixin,
	ChatActionMixin,
	CloneMixin,
]);

inspectable(PreCheckoutQueryContext, {
	serialize(context) {
		const payload = {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			currency: context.currency,
			totalAmount: context.totalAmount,
			invoicePayload: context.invoicePayload,
			shippingOptionId: context.shippingOptionId,
			orderInfo: context.orderInfo,
		};

		return filterPayload(payload);
	},
});

export { PreCheckoutQueryContext };
