import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * This object represents a chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#chat)
 */
@Inspectable()
export class Chat {
	constructor(public payload: TelegramObjects.TelegramChat) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
	 */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/**
	 * Type of the chat, can be either “private”, “group”, “supergroup” or “channel”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * *Optional*. Title, for supergroups, channels and group chats
	 */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/**
	 * *Optional*. Username, for private chats, supergroups and channels if available
	 */
	@Inspect()
	get username() {
		return this.payload.username;
	}

	/**
	 * *Optional*. First name of the other party in a private chat
	 */
	@Inspect()
	get firstName() {
		return this.payload.first_name;
	}

	/**
	 * *Optional*. Last name of the other party in a private chat
	 */
	@Inspect()
	get lastName() {
		return this.payload.last_name;
	}

	/**
	 * *Optional*. *True*, if the supergroup chat is a forum (has [topics](https://telegram.org/blog/topics-in-groups-collectible-usernames#topics-in-groups) enabled)
	 */
	@Inspect()
	get isForum() {
		return this.payload.is_forum;
	}
}
