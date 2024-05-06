import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * The background is a freeform gradient that rotates after every message in the chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundfillfreeformgradient)
 */
@Inspectable()
export class BackgroundFillFreeformGradient {
	constructor(
		public payload: TelegramObjects.TelegramBackgroundFillFreeformGradient,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the background fill, always “freeform\_gradient”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format
	 */
	@Inspect()
	get colors() {
		return this.payload.colors;
	}
}
