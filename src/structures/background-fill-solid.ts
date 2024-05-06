import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * The background is filled using the selected color.
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundfillsolid)
 */
@Inspectable()
export class BackgroundFillSolid {
	constructor(public payload: TelegramObjects.TelegramBackgroundFillSolid) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the background fill, always “solid”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * The color of the background fill in the RGB24 format
	 */
	@Inspect()
	get color() {
		return this.payload.color;
	}
}
