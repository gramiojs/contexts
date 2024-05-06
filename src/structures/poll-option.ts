import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { MessageEntity } from "./message-entity";

/**
 * This object contains information about one answer option in a poll.
 *
 * [Documentation](https://core.telegram.org/bots/api/#polloption)
 */
@Inspectable()
export class PollOption {
	constructor(public payload: TelegramObjects.TelegramPollOption) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Option text, 1-100 characters
	 */
	@Inspect()
	get text() {
		return this.payload.text;
	}

	/**
	 * *Optional*. Special entities that appear in the option *text*. Currently, only custom emoji entities are allowed in poll option texts
	 */
	@Inspect()
	get textEntities() {
		return this.payload.text_entities
			? this.payload.text_entities.map((x) => new MessageEntity(x))
			: undefined;
	}

	/**
	 * Number of users that voted for this option
	 */
	@Inspect()
	get voterCount() {
		return this.payload.voter_count;
	}
}
