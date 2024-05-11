import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Chat } from "./chat";

/**
 * This object represents a story.
 *
 * [Documentation](https://core.telegram.org/bots/api/#story)
 */
@Inspectable()
export class Story {
	constructor(public payload: TelegramObjects.TelegramStory) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique identifier for the story in the chat */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/** Chat that posted the story */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}
}
