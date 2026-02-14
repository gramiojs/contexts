import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { User } from "./user";

/**
 * Describes a service message about an ownership change in the chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#chatownerchanged)
 */
@Inspectable()
export class ChatOwnerChanged {
	constructor(public payload: TelegramObjects.TelegramChatOwnerChanged) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * The new owner of the chat
	 */
	@Inspect()
	get newOwner() {
		return new User(this.payload.new_owner);
	}
}
memoizeGetters(ChatOwnerChanged, ["newOwner"]);
