import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { SharedUser } from "./shared-user";

/** This object contains information about the user whose identifier was shared with the bot using a `KeyboardButtonRequestUser` button. */
@Inspectable()
export class UsersShared {
	constructor(public payload: TelegramObjects.TelegramUsersShared) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Identifier of the request */
	@Inspect()
	get requestId() {
		return this.payload.request_id;
	}

	/** Information about users shared with the bot. */
	@Inspect()
	get users() {
		return this.payload.users.map((user) => new SharedUser(user));
	}
}
