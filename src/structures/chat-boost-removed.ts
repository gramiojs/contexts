import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import { Chat } from "./chat";
import {
	ChatBoostSourceGiftCode,
	ChatBoostSourceGiveaway,
	ChatBoostSourcePremium,
} from "./chat-boost-source";

/** This object represents a boost added to a chat or changed. */
@Inspectable()
export class ChatBoostRemoved {
	constructor(public payload: TelegramObjects.TelegramChatBoostRemoved) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Chat which was boosted */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** Unique identifier of the boost */
	@Inspect()
	get id() {
		return this.payload.boost_id;
	}

	/** Point in time (Unix timestamp) when the boost was removed */
	@Inspect()
	get removeDate() {
		return this.payload.remove_date;
	}

	/** Source of the removed boost */
	@Inspect()
	get source() {
		if (this.payload.source.source === "premium") {
			return new ChatBoostSourcePremium(this.payload.source);
		}

		if (this.payload.source.source === "gift_code") {
			return new ChatBoostSourceGiftCode(this.payload.source);
		}

		if (this.payload.source.source === "giveaway") {
			return new ChatBoostSourceGiveaway(this.payload.source);
		}

		throw new TypeError("unknown chat boost source");
	}
}

memoizeGetters(ChatBoostRemoved, ["chat", "source"]);
