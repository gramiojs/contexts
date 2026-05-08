import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/** Describes an inline message sent by a guest bot. */
@Inspectable()
export class SentGuestMessage {
	constructor(public payload: TelegramObjects.TelegramSentGuestMessage) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Identifier of the sent inline message */
	@Inspect()
	get inlineMessageId() {
		return this.payload.inline_message_id;
	}
}
