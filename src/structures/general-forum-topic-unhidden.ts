import { Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
@Inspectable()
export class GeneralForumTopicUnhidden {
	constructor(public payload: Interfaces.TelegramGeneralForumTopicUnhidden) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
