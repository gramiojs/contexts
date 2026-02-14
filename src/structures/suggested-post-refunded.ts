import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * Describes a service message about a payment refund for a suggested post.
 *
 * [Documentation](https://core.telegram.org/bots/api/#suggestedpostrefunded)
 */
@Inspectable()
export class SuggestedPostRefunded {
	constructor(public payload: TelegramObjects.TelegramSuggestedPostRefunded) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Reason for the refund. Currently, one of "post_deleted", or "payment_refunded"
	 */
	@Inspect()
	get reason() {
		return this.payload.reason;
	}
}
