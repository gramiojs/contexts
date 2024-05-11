import { Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about an edited forum topic. */
@Inspectable()
export class ForumTopicReopened {
	constructor(public payload: TelegramObjects.TelegramForumTopicReopened) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
