import { Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * This object represents a service message about a video chat started in the chat.
 * Currently holds no information.
 */
@Inspectable()
export class VideoChatStarted {
	constructor(public payload: TelegramObjects.TelegramVideoChatStarted) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
