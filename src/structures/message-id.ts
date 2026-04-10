import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/** This object represents a unique message identifier. */
@Inspectable()
export class MessageId {
	constructor(public payload: TelegramObjects.TelegramMessageId) {}

	/** Unique message identifier */
	@Inspect()
	get id() {
		return this.payload.message_id;
	}
}
