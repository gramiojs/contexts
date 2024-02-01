import { Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/**
 * This object represents a service message about a video chat started in the chat.
 * Currently holds no information.
 */
@Inspectable()
export class VideoChatStarted {
	constructor(public payload: Interfaces.TelegramVideoChatStarted) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
