import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * Describes a service message about the rejection of a suggested post.
 *
 * [Documentation](https://core.telegram.org/bots/api/#suggestedpostdeclined)
 */
@Inspectable()
export class SuggestedPostDeclined {
	constructor(public payload: TelegramObjects.TelegramSuggestedPostDeclined) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *Optional*. Comment with which the post was declined
	 */
	@Inspect({ nullable: false })
	get comment() {
		return this.payload.comment;
	}
}
