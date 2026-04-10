import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import { InaccessibleMessage } from "./inaccessible-message";
import { Message } from "./message";
import { MessageEntity } from "./message-entity";

/**
 * Describes a service message about an option deleted from a poll.
 *
 * [Documentation](https://core.telegram.org/bots/api/#polloptiondeleted)
 */
@Inspectable()
export class PollOptionDeleted {
	constructor(public payload: TelegramObjects.TelegramPollOptionDeleted) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *Optional*. Message containing the poll from which the option was deleted, if known. Note that the Message object in this field will not contain the *reply_to_message* field even if it itself is a reply.
	 */
	@Inspect({ nullable: false })
	get pollMessage():
		| InaccessibleMessage
		| Omit<Message, "replyMessage">
		| undefined {
		const { poll_message } = this.payload;

		if (!poll_message) return undefined;

		if (poll_message.date === 0) {
			return new InaccessibleMessage(poll_message);
		}

		return new Message(poll_message);
	}

	/** Unique identifier of the deleted option */
	@Inspect()
	get optionPersistentId() {
		return this.payload.option_persistent_id;
	}

	/** Option text */
	@Inspect()
	get optionText() {
		return this.payload.option_text;
	}

	/** *Optional*. Special entities that appear in the *optionText* */
	@Inspect({ nullable: false })
	get optionTextEntities() {
		const { option_text_entities } = this.payload;

		if (!option_text_entities) return undefined;

		return option_text_entities.map((entity) => new MessageEntity(entity));
	}
}

memoizeGetters(PollOptionDeleted, ["pollMessage", "optionTextEntities"]);
