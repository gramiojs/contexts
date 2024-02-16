import { TelegramObjects } from "@gramio/types";

import type { ChatBoostSourceGiftCode } from "./gift-code";
import type { ChatBoostSourceGiveaway } from "./giveaway";
import type { ChatBoostSourcePremium } from "./premium";

interface ChatBoostSourceMapping {
	premium: ChatBoostSourcePremium;
	gift_code: ChatBoostSourceGiftCode;
	giveaway: ChatBoostSourceGiveaway;
}

export class ChatBoostSource {
	constructor(public payload: TelegramObjects.TelegramChatBoostSource) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Is this chat boost source a certain one? */
	is<T extends TelegramObjects.TelegramChatBoostSource["source"]>(
		source: T,
	): this is ChatBoostSourceMapping[T] {
		return this.payload.source === source;
	}
}
