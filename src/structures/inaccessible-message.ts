import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "#utils";
import { Chat } from "./chat";

@Inspectable()
export class InaccessibleMessage {
	constructor(public payload: TelegramObjects.TelegramInaccessibleMessage) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique message identifier inside the chat */
	@Inspect()
	get id() {
		return this.payload.message_id;
	}

	/** Chat the message belonged to */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** Always `0`. The field can be used to differentiate regular and inaccessible messages. */
	@Inspect()
	get date() {
		return this.payload.date;
	}
}

memoizeGetters(InaccessibleMessage, ["chat"]);
