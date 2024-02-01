import { Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
@Inspectable()
export class GeneralForumTopicHidden {
	constructor(public payload: Interfaces.TelegramGeneralForumTopicHidden) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
