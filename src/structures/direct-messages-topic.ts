import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { User } from "./user";

/**
 * Describes a topic of a direct messages chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#directmessagestopic)
 */
@Inspectable()
export class DirectMessagesTopic {
	constructor(public payload: TelegramObjects.TelegramDirectMessagesTopic) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Unique identifier of the topic
	 */
	@Inspect()
	get topicId() {
		return this.payload.topic_id;
	}

	/**
	 * *Optional*. Information about the user that created the topic. Currently, it is always present
	 */
	@Inspect({ nullable: false })
	get user() {
		const { user } = this.payload;

		if (!user) return undefined;

		return new User(user);
	}
}

memoizeGetters(DirectMessagesTopic, ["user"]);
