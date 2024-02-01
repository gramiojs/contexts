import { Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
@Inspectable()
export class ForumTopicClosed {
	constructor(public payload: Interfaces.TelegramForumTopicClosed) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
