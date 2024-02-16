import { inspectable } from "inspectable";

import { TelegramParams } from "@gramio/types";
import { TelegramObjects } from "@gramio/types";

import type { Bot } from "gramio";
import { applyMixins, filterPayload } from "#utils";
import type { Constructor, Optional } from "#utils";
import { ShippingQuery } from "../structures";

import { Context } from "./context";
import { ChatActionMixin, CloneMixin, SendMixin } from "./mixins";

interface ShippingQueryContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramShippingQuery;
	updateId: number;
}

class ShippingQueryContext extends Context {
	payload: TelegramObjects.TelegramShippingQuery;

	constructor(options: ShippingQueryContextOptions) {
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
interface ShippingQueryContext
	extends Constructor<ShippingQueryContext>,
		ShippingQuery,
		SendMixin,
		ChatActionMixin,
		CloneMixin<ShippingQueryContext, ShippingQueryContextOptions> {}
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
