import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { StickerAttachment } from "./attachments/sticker";
import { UniqueGift } from "./unique-gift";

/**
 * Describes a service message about a unique gift that was sent or received.
 *
 * [Documentation](https://core.telegram.org/bots/api/#uniquegiftinfo)
 */
@Inspectable()
export class UniqueGiftInfo {
	constructor(public payload: TelegramObjects.TelegramUniqueGiftInfo) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Information about the gift
	 */
	@Inspect()
	get gift() {
		return new UniqueGift(this.payload.gift);
	}
	/**
	 * Origin of the gift. Currently, either “upgrade” or “transfer”
	 */
	@Inspect()
	get origin() {
		return this.payload.origin;
	}
	/**
	 * *Optional*. Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts
	 */
	@Inspect()
	get ownedGiftId() {
		return this.payload.owned_gift_id;
	}
	/**
	 * *Optional*. Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift
	 */
	@Inspect()
	get transferStarCount() {
		return this.payload.transfer_star_count;
	}
}
