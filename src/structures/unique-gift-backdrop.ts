import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { StickerAttachment } from "./attachments/sticker";
import { UniqueGiftBackdropColors } from "./unique-gift-backdrop-colors";

/**
 * This object describes the colors of the backdrop of a unique gift.
 *
 * [Documentation](https://core.telegram.org/bots/api/#uniquegiftbackdropcolors)
 */
@Inspectable()
export class UniqueGiftBackdrop {
	constructor(public payload: TelegramObjects.TelegramUniqueGiftBackdrop) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
	/**
	 * Name of the backdrop
	 */
	@Inspect()
	get name() {
		return this.payload.name;
	}
	/**
	 * Colors of the backdrop
	 */
	@Inspect()
	get colors() {
		return new UniqueGiftBackdropColors(this.payload.colors);
	}
	/**
	 * The number of unique gifts that receive this model for every 1000 gifts upgraded
	 */
	@Inspect()
	get rarityPerMille() {
		return this.payload.rarity_per_mille;
	}
}
