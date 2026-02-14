import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { Gift } from "./gift";
import { MessageEntity } from "./message-entity";

/**
 * Describes a service message about a regular gift that was sent or received.
 *
 * [Documentation](https://core.telegram.org/bots/api/#giftinfo)
 */
@Inspectable()
export class GiftInfo {
	constructor(public payload: TelegramObjects.TelegramGiftInfo) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Information about the gift */
	@Inspect()
	get gift() {
		return new Gift(this.payload.gift);
	}

	/** Identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
	@Inspect()
	get ownedGiftId() {
		return this.payload.owned_gift_id;
	}

	/** Number of Telegram Stars that can be claimed by the receiver by converting the gift; omitted if conversion to Telegram Stars is impossible */
	@Inspect()
	get convertStarCount() {
		return this.payload.convert_star_count;
	}

	/** Number of Telegram Stars that were prepaid by the sender for the ability to upgrade the gift */
	@Inspect()
	get prepaidUpgradeStarCount() {
		return this.payload.prepaid_upgrade_star_count;
	}

	/** True, if the gift can be upgraded to a unique gift */
	@Inspect()
	get canBeUpgraded() {
		return this.payload.can_be_upgraded;
	}

	/** Text of the message that was added to the gift */
	@Inspect()
	get text() {
		return this.payload.text;
	}

	/** Special entities that appear in the text */
	@Inspect()
	get entities() {
		return this.payload.entities?.map((entity) => new MessageEntity(entity));
	}

	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	@Inspect()
	get isPrivate() {
		return this.payload.is_private;
	}

	/** *Optional*. True, if the gift's upgrade was purchased after the gift was sent */
	@Inspect()
	get isUpgradeSeparate() {
		return this.payload.is_upgrade_separate;
	}

	/** *Optional*. Unique number reserved for this gift when upgraded */
	@Inspect()
	get uniqueGiftNumber() {
		return this.payload.unique_gift_number;
	}
}
