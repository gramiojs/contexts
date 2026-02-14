import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { User } from "./user";

/**
 * Describes a service message about the chat owner leaving the chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#chatownerleft)
 */
@Inspectable()
export class ChatOwnerLeft {
	constructor(public payload: TelegramObjects.TelegramChatOwnerLeft) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *Optional*. The user which will be the new owner of the chat if the previous owner does not return to the chat
	 */
	@Inspect({ nullable: false })
	get newOwner() {
		const { new_owner } = this.payload;

		if (!new_owner) return undefined;

		return new User(new_owner);
	}
}
memoizeGetters(ChatOwnerLeft, ["newOwner"]);
