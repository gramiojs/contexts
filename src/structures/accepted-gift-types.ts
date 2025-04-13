import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * This object describes the types of gifts that can be gifted to a user or a chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#acceptedgifttypes)
 */
@Inspectable()
export class AcceptedGiftTypes {
	constructor(public payload: TelegramObjects.TelegramAcceptedGiftTypes) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * True, if unlimited regular gifts are accepted
	 */
	@Inspect()
	get unlimitedGifts() {
		return this.payload.unlimited_gifts;
	}

	/**
	 * True, if limited regular gifts are accepted
	 */
	@Inspect()
	get limitedGifts() {
		return this.payload.limited_gifts;
	}

	/**
	 * True, if unique gifts or gifts that can be upgraded to unique for free are accepted
	 */
	@Inspect()
	get uniqueGifts() {
		return this.payload.unique_gifts;
	}

	/**
	 * True, if a Telegram Premium subscription is accepted
	 */
	@Inspect()
	get premiumSubscription() {
		return this.payload.premium_subscription;
	}
}
