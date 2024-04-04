import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * [Documentation](https://core.telegram.org/bots/api/#businessopeninghoursinterval)
 */
@Inspectable()
export class BusinessOpeningHoursInterval {
	constructor(
		public payload: TelegramObjects.TelegramBusinessOpeningHoursInterval,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The minute's sequence number in a week, starting on Monday, marking the start of the time interval during which the business is open; 0 - 7 \* 24 \* 60 */
	@Inspect()
	get openingMinute() {
		return this.payload.opening_minute;
	}

	/** The minute's sequence number in a week, starting on Monday, marking the end of the time interval during which the business is open; 0 - 8 \* 24 \* 60 */
	@Inspect()
	get closingMinute() {
		return this.payload.closing_minute;
	}
}
