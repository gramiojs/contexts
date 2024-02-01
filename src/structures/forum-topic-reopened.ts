import { Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** This object represents a service message about an edited forum topic. */
@Inspectable()
export class ForumTopicReopened {
	constructor(public payload: Interfaces.TelegramForumTopicReopened) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
