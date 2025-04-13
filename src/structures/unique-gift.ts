import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { StickerAttachment } from "./attachments/sticker";

/**
 * This object describes a unique gift that was upgraded from a regular gift.
 *
 * [Documentation](https://core.telegram.org/bots/api/#uniquegift)
 */
@Inspectable()
export class UniqueGift {
	constructor(public payload: TelegramObjects.TelegramUniqueGift) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Human-readable name of the regular gift from which this unique gift was upgraded
	 */
	@Inspect()
	get baseName() {
		return this.payload.base_name;
	}
	/**
	 * Unique name of the gift. This name can be used in `https://t.me/nft/...` links and story areas
	 */
	@Inspect()
	get name() {
		return this.payload.name;
	}
	/**
	 * Unique number of the upgraded gift among gifts upgraded from the same regular gift
	 */
	@Inspect()
	get number() {
		return this.payload.number;
	}
}
