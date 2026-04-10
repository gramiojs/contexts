import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { Chat } from "./chat";
import { MessageEntity } from "./message-entity";
import { User } from "./user";

/**
 * This object contains information about one answer option in a poll.
 *
 * [Documentation](https://core.telegram.org/bots/api/#polloption)
 */
@Inspectable()
export class PollOption {
	constructor(public payload: TelegramObjects.TelegramPollOption) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique identifier of the option, persistent on option addition and deletion */
	@Inspect()
	get persistentId() {
		return this.payload.persistent_id;
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
	 * Number of users who voted for this option; may be 0 if unknown
	 */
	@Inspect()
	get voterCount() {
		return this.payload.voter_count;
	}

	/**
	 * *Optional*. User who added the option; omitted if the option wasn't added by a user after poll creation
	 */
	@Inspect({ nullable: false })
	get addedByUser() {
		const { added_by_user } = this.payload;

		if (!added_by_user) return undefined;

		return new User(added_by_user);
	}

	/**
	 * *Optional*. Chat that added the option; omitted if the option wasn't added by a chat after poll creation
	 */
	@Inspect({ nullable: false })
	get addedByChat() {
		const { added_by_chat } = this.payload;

		if (!added_by_chat) return undefined;

		return new Chat(added_by_chat);
	}

	/**
	 * *Optional*. Point in time (Unix timestamp) when the option was added; omitted if the option existed in the original poll
	 */
	@Inspect({ nullable: false })
	get additionDate() {
		return this.payload.addition_date;
	}
}

memoizeGetters(PollOption, ["addedByUser", "addedByChat"]);
