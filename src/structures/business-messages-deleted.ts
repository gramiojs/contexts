import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import { Chat } from "./chat";

/** Describes the connection of the bot with a business account. */
@Inspectable()
export class BusinessMessagesDeleted {
	constructor(
		public payload: TelegramObjects.TelegramBusinessMessagesDeleted,
	) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique identifier of the business connection */
	@Inspect()
	get businessConnectionId() {
		return this.payload.business_connection_id;
	}

	/** Information about a chat in the business account. The bot may not have access to the chat or the corresponding user. */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** A list of identifiers of deleted messages in the chat of the business account */
	@Inspect()
	get messageIds() {
		return this.payload.message_ids;
	}
}

memoizeGetters(BusinessMessagesDeleted, ["chat"]);
