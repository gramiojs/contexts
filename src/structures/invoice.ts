import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object contains basic information about an invoice. */
@Inspectable()
export class Invoice {
	constructor(public payload: TelegramObjects.TelegramInvoice) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Product name */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/** Product description */
	@Inspect()
	get description() {
		return this.payload.description;
	}

	/**
	 * Unique bot deep-linking parameter that can be used to generate this
	 * invoice
	 */
	@Inspect()
	get startParameter() {
		return this.payload.start_parameter;
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
}
