import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * [Documentation](https://core.telegram.org/bots/api/#birthdate)
 */
@Inspectable()
export class Birthdate {
	constructor(public payload: TelegramObjects.TelegramBirthdate) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Day of the user's birth; 1-31 */
	@Inspect()
	get day() {
		return this.payload.day;
	}

	/** Month of the user's birth; 1-12 */
	@Inspect()
	get month() {
		return this.payload.month;
	}

	/** Year of the user's birth */
	@Inspect()
	get year() {
		return this.payload.year;
	}
}
