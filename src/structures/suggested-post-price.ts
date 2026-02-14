import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * Describes price of a suggested post.
 *
 * [Documentation](https://core.telegram.org/bots/api/#suggestedpostprice)
 */
@Inspectable()
export class SuggestedPostPrice {
	constructor(public payload: TelegramObjects.TelegramSuggestedPostPrice) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Currency in which the post will be paid. Currently, must be one of "XTR" for Telegram Stars or "TON" for toncoins
	 */
	@Inspect()
	get currency() {
		return this.payload.currency;
	}

	/**
	 * The amount of the currency that will be paid for the post in the smallest units of the currency
	 */
	@Inspect()
	get amount() {
		return this.payload.amount;
	}
}
