import { Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
@Inspectable()
export class ForumTopicClosed {
	constructor(public payload: TelegramObjects.TelegramForumTopicClosed) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
