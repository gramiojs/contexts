import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about a user boosting a chat. */
@Inspectable()
export class ChatBoostAdded {
	constructor(public payload: TelegramObjects.TelegramChatBoostAdded) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Number of boosts added by the user */
	@Inspect()
	get boostCount() {
		return this.payload.boost_count;
	}
}
