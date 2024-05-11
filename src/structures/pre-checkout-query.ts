import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { OrderInfo } from "./order-info";
import { User } from "./user";

/** This object contains information about an incoming pre-checkout query. */
@Inspectable()
export class PreCheckoutQuery {
	constructor(public payload: TelegramObjects.TelegramPreCheckoutQuery) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique query identifier */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/** User who sent the query */
	@Inspect()
	get from() {
		return new User(this.payload.from);
	}

	/** Sender ID */
	@Inspect()
	get senderId() {
		return this.from.id;
	}

	/** Three-letter ISO 4217 currency code */
	@Inspect()
	get currency() {
		return this.payload.currency;
	}

	/**
	 * Total price in the smallest units of the currency
	 * (integer, not float/double). For example, for a price of
	 * `US$ 1.45` pass `amount = 145`. See the `exp` parameter in
	 * [currencies.json](https://core.telegram.org/bots/payments/currencies.json),
	 * it shows the number of digits past the decimal point for each currency
	 * (2 for the majority of currencies).
	 */
	@Inspect()
	get totalAmount() {
		return this.payload.total_amount;
	}

	/** Bot specified invoice payload */
	@Inspect()
	get invoicePayload() {
		return this.payload.invoice_payload;
	}

	/** Identifier of the shipping option chosen by the user */
	@Inspect({ nullable: false })
	get shippingOptionId() {
		return this.payload.shipping_option_id;
	}

	/** Order info provided by the user */
	@Inspect({ nullable: false })
	get orderInfo() {
		const { order_info } = this.payload;

		if (!order_info) return undefined;

		return new OrderInfo(order_info);
	}
}

memoizeGetters(PreCheckoutQuery, ["from", "orderInfo"]);
