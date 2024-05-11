import { inspectable } from "inspectable";

import type { TelegramParams } from "@gramio/types";
import type { TelegramObjects } from "@gramio/types";

import { ShippingQuery } from "../structures/index";
import type { Constructor, Optional } from "../types";
import { applyMixins, filterPayload } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import { ChatActionMixin, CloneMixin, SendMixin } from "./mixins/index";

interface ShippingQueryContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramShippingQuery;
	updateId: number;
}

class ShippingQueryContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramShippingQuery;

	constructor(options: ShippingQueryContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "shipping_query",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Replies to shipping queries */
	answerShippingQuery<Ok extends boolean>(
		ok: Ok = true as Ok,
		params?: Optional<
			TelegramParams.AnswerShippingQueryParams,
			"shipping_query_id" | "ok"
		> &
			Required<
				Pick<
					TelegramParams.AnswerShippingQueryParams,
					true extends Ok ? "shipping_options" : "error_message"
				>
			>,
	) {
		return this.bot.api.answerShippingQuery({
			shipping_query_id: this.id,
			ok,
			...params,
		});
	}

	/** Replies to shipping queries. An alias for `answerShippingQuery` */
	answer<Ok extends boolean>(
		ok: Ok = true as Ok,
		params?: Optional<
			TelegramParams.AnswerShippingQueryParams,
			"shipping_query_id" | "ok"
		> &
			Required<
				Pick<
					TelegramParams.AnswerShippingQueryParams,
					true extends Ok ? "shipping_options" : "error_message"
				>
			>,
	) {
		return this.answerShippingQuery(ok, params);
	}
}

// @ts-expect-error [senderId: number] is not compatible with [senderId: number | undefined] :shrug:
interface ShippingQueryContext<Bot extends BotLike>
	extends Constructor<ShippingQueryContext<Bot>>,
		ShippingQuery,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		CloneMixin<
			Bot,
			ShippingQueryContext<Bot>,
			ShippingQueryContextOptions<Bot>
		> {}
applyMixins(ShippingQueryContext, [
	ShippingQuery,
	SendMixin,
	ChatActionMixin,
	CloneMixin,
]);

inspectable(ShippingQueryContext, {
	serialize(context) {
		const payload = {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			invoicePayload: context.invoicePayload,
			shippingAddress: context.shippingAddress,
		};

		return filterPayload(payload);
	},
});

export { ShippingQueryContext };
