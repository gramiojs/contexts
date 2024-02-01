import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** This object represents a service message about a change in auto-delete timer settings */
@Inspectable()
export class MessageAutoDeleteTimerChanged {
	constructor(
		public payload: Interfaces.TelegramMessageAutoDeleteTimerChanged,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** New auto-delete time for messages in the chat */
	@Inspect()
	get messageAutoDeleteTime() {
		return this.payload.message_auto_delete_time;
	}
}
