import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { User } from "./user";

/**
 * Describes the connection of the bot with a business account.
 *
 * [Documentation](https://core.telegram.org/bots/api/#businessconnection)
 */
@Inspectable()
export class BusinessConnection {
	constructor(public payload: TelegramObjects.TelegramBusinessConnection) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Unique identifier of the business connection
	 */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/**
	 * Business account user that created the business connection
	 */
	@Inspect()
	get user() {
		return new User(this.payload.user);
	}

	/**
	 * Identifier of a private chat with the user who created the business connection. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.
	 */
	@Inspect()
	get userChatId() {
		return this.payload.user_chat_id;
	}

	/**
	 * Date the connection was established in Unix time
	 */
	@Inspect()
	get date() {
		return this.payload.date;
	}

	/**
	 * True, if the bot can act on behalf of the business account in chats that were active in the last 24 hours
	 */
	@Inspect()
	get canReply() {
		return this.payload.can_reply;
	}

	/**
	 * True, if the connection is active
	 */
	@Inspect()
	get isEnabled() {
		return this.payload.is_enabled;
	}
}
