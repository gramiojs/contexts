import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about an edited forum topic. */
@Inspectable()
export class ForumTopicEdited {
	constructor(public payload: TelegramObjects.TelegramForumTopicEdited) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** New name of the topic, if it was edited */
	@Inspect()
	get name() {
		return this.payload.name;
	}

	/** New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
	@Inspect({ nullable: false })
	get iconCustomEmojiId() {
		return this.payload.icon_custom_emoji_id;
	}
}
