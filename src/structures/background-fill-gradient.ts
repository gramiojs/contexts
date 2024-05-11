import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * The background is a gradient fill.
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundfillgradient)
 */
@Inspectable()
export class BackgroundFillGradient {
	constructor(public payload: TelegramObjects.TelegramBackgroundFillGradient) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the background fill, always “gradient”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * Top color of the gradient in the RGB24 format
	 */
	@Inspect()
	get topColor() {
		return this.payload.top_color;
	}

	/**
	 * Bottom color of the gradient in the RGB24 format
	 */
	@Inspect()
	get bottomColor() {
		return this.payload.bottom_color;
	}

	/**
	 * Clockwise rotation angle of the background fill in degrees; 0-359
	 */
	@Inspect()
	get rotationAngle() {
		return this.payload.rotation_angle;
	}
}
