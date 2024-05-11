import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about a video chat ended in the chat. */
@Inspectable()
export class VideoChatEnded {
	constructor(public payload: TelegramObjects.TelegramVideoChatEnded) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Video chat duration; in seconds */
	@Inspect()
	get duration() {
		return this.payload.duration;
	}
}
