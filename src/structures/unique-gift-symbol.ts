import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { StickerAttachment } from "./attachments/sticker";

/**
 * Describes a service message about a regular gift that was sent or received.
 *
 * [Documentation](https://core.telegram.org/bots/api/#giftinfo)
 */
@Inspectable()
export class UniqueGiftSymbol {
	constructor(public payload: TelegramObjects.TelegramUniqueGiftSymbol) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
	/**
	 * Name of the model
	 */
	@Inspect()
	get name() {
		return this.payload.name;
	}
	/**
	 * The sticker that represents the unique gift
	 */
	@Inspect()
	get sticker() {
		return new StickerAttachment(this.payload.sticker);
	}
	/**
	 * The number of unique gifts that receive this model for every 1000 gifts upgraded
	 */
	@Inspect()
	get rarityPerMille() {
		return this.payload.rarity_per_mille;
	}
}
