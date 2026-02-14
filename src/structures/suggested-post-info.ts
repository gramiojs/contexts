import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { SuggestedPostPrice } from "./suggested-post-price";

/**
 * Contains information about a suggested post.
 *
 * [Documentation](https://core.telegram.org/bots/api/#suggestedpostinfo)
 */
@Inspectable()
export class SuggestedPostInfo {
	constructor(public payload: TelegramObjects.TelegramSuggestedPostInfo) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * State of the suggested post. Currently, it can be one of "pending", "approved", "declined".
	 */
	@Inspect()
	get state() {
		return this.payload.state;
	}

	/**
	 * *Optional*. Proposed price of the post. If the field is omitted, then the post is unpaid.
	 */
	@Inspect({ nullable: false })
	get price() {
		const { price } = this.payload;

		if (!price) return undefined;

		return new SuggestedPostPrice(price);
	}

	/**
	 * *Optional*. Proposed send date of the post.
	 */
	@Inspect({ nullable: false })
	get sendDate() {
		return this.payload.send_date;
	}
}

memoizeGetters(SuggestedPostInfo, ["price"]);
