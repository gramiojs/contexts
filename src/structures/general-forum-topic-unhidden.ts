import { Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
@Inspectable()
export class GeneralForumTopicUnhidden {
	constructor(
		public payload: TelegramObjects.TelegramGeneralForumTopicUnhidden,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
