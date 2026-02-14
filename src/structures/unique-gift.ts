import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { StickerAttachment } from "./attachments/sticker";
import { Chat } from "./chat";
import { UniqueGiftColors } from "./unique-gift-colors";

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
	 * Identifier of the regular gift from which the gift was upgraded
	 */
	@Inspect()
	get giftId() {
		return this.payload.gift_id;
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

	/** *Optional*. True, if the original regular gift was exclusively purchaseable by Telegram Premium subscribers */
	@Inspect()
	get isPremium() {
		return this.payload.is_premium;
	}

	/** *Optional*. True, if the gift is assigned from the TON blockchain and can't be resold or transferred in Telegram */
	@Inspect()
	get isFromBlockchain() {
		return this.payload.is_from_blockchain;
	}

	/** *Optional*. The color scheme that can be used by the gift's owner for the chat's name, replies to messages and link previews */
	@Inspect({ nullable: false })
	get colors() {
		const { colors } = this.payload;

		if (!colors) return undefined;

		return new UniqueGiftColors(colors);
	}

	/** *Optional*. Information about the chat that published the gift */
	@Inspect({ nullable: false })
	get publisherChat() {
		const { publisher_chat } = this.payload;

		if (!publisher_chat) return undefined;

		return new Chat(publisher_chat);
	}
}
memoizeGetters(UniqueGift, ["colors", "publisherChat"]);
