import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { backgroundFillMap } from "./background-fill";

/**
 * The background is automatically filled based on the selected colors.
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundtypefill)
 */
@Inspectable()
export class BackgroundTypeFill {
	constructor(public payload: TelegramObjects.TelegramBackgroundTypeFill) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the background, always “fill”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * The background fill
	 */
	@Inspect()
	get fill() {
		// @ts-expect-error
		return new backgroundFillMap[this.payload.fill.type](this.payload.fill);
	}

	/**
	 * Dimming of the background in dark themes, as a percentage; 0-100
	 */
	@Inspect()
	get darkThemeDimming() {
		return this.payload.dark_theme_dimming;
	}
}
memoizeGetters(BackgroundTypeFill, ["fill"]);
