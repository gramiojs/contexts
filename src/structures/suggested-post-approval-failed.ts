import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { SuggestedPostPrice } from "./suggested-post-price";

/**
 * Describes a service message about the failed approval of a suggested post.
 *
 * [Documentation](https://core.telegram.org/bots/api/#suggestedpostapprovalfailed)
 */
@Inspectable()
export class SuggestedPostApprovalFailed {
	constructor(
		public payload: TelegramObjects.TelegramSuggestedPostApprovalFailed,
	) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Expected price of the post
	 */
	@Inspect()
	get price() {
		return new SuggestedPostPrice(this.payload.price);
	}
}

memoizeGetters(SuggestedPostApprovalFailed, ["price"]);
