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
	 * *Optional*. For gifts bought from other users, the currency in which the payment for the gift was done. Currently, one of “XTR” for Telegram Stars or “TON” for toncoins
	 */
	@Inspect()
	get lastResaleCurrency() {
		return this.payload.last_resale_currency;
	}

	/**
	 * *Optional*. For gifts bought from other users, the price paid for the gift in either Telegram Stars or nanotoncoins
	 */
	@Inspect()
	get lastResaleAmount() {
		return this.payload.last_resale_amount;
	}

	/**
	 * *Optional*. For gifts bought from other users, the price paid for the gift in either Telegram Stars or nanotoncoins
	 */
	@Inspect()
	get lastResaleStarCount() {
		return this.payload.last_resale_currency === "XTR"
			? this.payload.last_resale_amount
			: undefined;
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
	/**
	 * *Optional*. Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now
	 */
	@Inspect()
	get nextTransferDate() {
		return this.payload.next_transfer_date;
	}
}
