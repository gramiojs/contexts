import { Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
@Inspectable()
export class ForumTopicClosed {
	constructor(public payload: TelegramObjects.TelegramForumTopicClosed) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
