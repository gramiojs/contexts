import * as Interfaces from "@gramio/types/objects";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "#utils";
import { Chat } from "./chat";
import { ChatBoost } from "./chat-boost";

/** This object represents a boost added to a chat or changed. */
@Inspectable()
export class ChatBoostUpdated {
	constructor(public payload: Interfaces.TelegramChatBoostUpdated) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Chat which was boosted */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** Information about the chat boost */
	@Inspect()
	get boost() {
		return new ChatBoost(this.payload.boost);
	}
}

memoizeGetters(ChatBoostUpdated, ["chat", "boost"]);
