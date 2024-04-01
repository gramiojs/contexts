import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * This object represents a service message about a video chat scheduled in the chat
 */
@Inspectable()
export class VideoChatScheduled {
	constructor(public payload: TelegramObjects.TelegramVideoChatScheduled) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator */
	@Inspect()
	get startDate() {
		return this.payload.start_date;
	}
}
