import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { StickerAttachment } from "./attachments/sticker";
import { Chat } from "./chat";

/**
 * Describes a service message about a regular gift that was sent or received.
 *
 * [Documentation](https://core.telegram.org/bots/api/#giftinfo)
 */
@Inspectable()
export class Gift {
	constructor(public payload: TelegramObjects.TelegramGift) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The sticker that represents the gift */
	@Inspect()
	get sticker() {
		return new StickerAttachment(this.payload.sticker);
	}

	/** The number of Telegram Stars that must be paid to send the sticker */
	@Inspect()
	get starCount() {
		return this.payload.star_count;
	}

	/** The number of Telegram Stars that must be paid to upgrade the gift to a unique one */
	@Inspect()
	get upgradeStarCount() {
		return this.payload.upgrade_star_count;
	}

	/** The total number of the gifts of this type that can be sent; for limited gifts only */
	@Inspect()
	get totalCount() {
		return this.payload.total_count;
	}

	/** The number of remaining gifts of this type that can be sent; for limited gifts only */
	@Inspect()
	get remainingCount() {
		return this.payload.remaining_count;
	}

	/** Information about the gift */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/** *Optional*. Information about the chat that published the gift */
	@Inspect({ nullable: false })
	get publisherChat() {
		const { publisher_chat } = this.payload;

		if (!publisher_chat) return undefined;

		return new Chat(publisher_chat);
	}
}
