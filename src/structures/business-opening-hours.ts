import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * [Documentation](https://core.telegram.org/bots/api/#businessopeninghours)
 */
@Inspectable()
export class BusinessOpeningHours {
	constructor(public payload: TelegramObjects.TelegramBusinessOpeningHours) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique name of the time zone for which the opening hours are defined */
	@Inspect()
	get timeZoneName() {
		return this.payload.time_zone_name;
	}

	/** List of time intervals describing business opening hours */
	@Inspect()
	get openingHours() {
		return this.payload.opening_hours;
	}
}
