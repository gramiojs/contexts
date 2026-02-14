import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * This object describes the background of a gift.
 *
 * [Documentation](https://core.telegram.org/bots/api/#giftbackground)
 */
@Inspectable()
export class GiftBackground {
	constructor(public payload: TelegramObjects.TelegramGiftBackground) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Center color of the background in RGB format
	 */
	@Inspect()
	get centerColor() {
		return this.payload.center_color;
	}

	/**
	 * Edge color of the background in RGB format
	 */
	@Inspect()
	get edgeColor() {
		return this.payload.edge_color;
	}

	/**
	 * Text color of the background in RGB format
	 */
	@Inspect()
	get textColor() {
		return this.payload.text_color;
	}
}
