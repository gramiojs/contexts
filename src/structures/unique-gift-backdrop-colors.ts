import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * Describes a service message about a regular gift that was sent or received.
 *
 * [Documentation](https://core.telegram.org/bots/api/#giftinfo)
 */
@Inspectable()
export class UniqueGiftBackdropColors {
	constructor(
		public payload: TelegramObjects.TelegramUniqueGiftBackdropColors,
	) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
	/**
	 * The color in the center of the backdrop in RGB format
	 */
	@Inspect()
	get centerColor() {
		return this.payload.center_color;
	}
	/**
	 * The color on the edges of the backdrop in RGB format
	 */
	@Inspect()
	get edgeColor() {
		return this.payload.edge_color;
	}
	/**
	 * The color to be applied to the symbol in RGB format
	 */
	@Inspect()
	get symbolColor() {
		return this.payload.symbol_color;
	}
	/**
	 * The color for the text on the backdrop in RGB format
	 */
	@Inspect()
	get textColor() {
		return this.payload.text_color;
	}
}
