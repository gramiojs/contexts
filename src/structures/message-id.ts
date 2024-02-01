import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** This object represents a unique message identifier. */
@Inspectable()
export class MessageId {
	constructor(public payload: Interfaces.TelegramMessageId) {}

	/** Unique message identifier */
	@Inspect()
	get id() {
		return this.payload.message_id;
	}
}
