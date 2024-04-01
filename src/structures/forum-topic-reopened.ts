import { Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about an edited forum topic. */
@Inspectable()
export class ForumTopicReopened {
	constructor(public payload: TelegramObjects.TelegramForumTopicReopened) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
