import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * Describes a service message about a successful payment for a suggested post.
 *
 * [Documentation](https://core.telegram.org/bots/api/#suggestedpostpaid)
 */
@Inspectable()
export class SuggestedPostPaid {
	constructor(public payload: TelegramObjects.TelegramSuggestedPostPaid) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Currency in which the payment was made. Currently, one of "XTR" for Telegram Stars or "TON" for toncoins
	 */
	@Inspect()
	get currency() {
		return this.payload.currency;
	}

	/**
	 * *Optional*. The amount of the currency that was received by the channel in nanotoncoins; for payments in toncoins only
	 */
	@Inspect({ nullable: false })
	get amount() {
		return this.payload.amount;
	}

	/**
	 * *Optional*. The amount of Telegram Stars that was received by the channel; for payments in Telegram Stars only
	 */
	@Inspect({ nullable: false })
	get starAmount() {
		return this.payload.star_amount;
	}
}
