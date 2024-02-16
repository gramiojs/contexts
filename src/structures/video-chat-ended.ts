import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

/** This object represents a service message about a video chat ended in the chat. */
@Inspectable()
export class VideoChatEnded {
	constructor(public payload: TelegramObjects.TelegramVideoChatEnded) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Video chat duration; in seconds */
	@Inspect()
	get duration() {
		return this.payload.duration;
	}
}
