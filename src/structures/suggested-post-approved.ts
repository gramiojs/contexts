import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { SuggestedPostPrice } from "./suggested-post-price";

/**
 * Describes a service message about the approval of a suggested post.
 *
 * [Documentation](https://core.telegram.org/bots/api/#suggestedpostapproved)
 */
@Inspectable()
export class SuggestedPostApproved {
	constructor(public payload: TelegramObjects.TelegramSuggestedPostApproved) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *Optional*. Amount paid for the post
	 */
	@Inspect({ nullable: false })
	get price() {
		const { price } = this.payload;

		if (!price) return undefined;

		return new SuggestedPostPrice(price);
	}

	/**
	 * Date when the post will be published
	 */
	@Inspect()
	get sendDate() {
		return this.payload.send_date;
	}
}

memoizeGetters(SuggestedPostApproved, ["price"]);
