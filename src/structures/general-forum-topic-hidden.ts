import { Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
@Inspectable()
export class GeneralForumTopicHidden {
	constructor(
		public payload: TelegramObjects.TelegramGeneralForumTopicHidden,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
