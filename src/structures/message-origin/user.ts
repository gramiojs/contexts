import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

import { User } from "../user";

import { memoizeGetters } from "#utils";
import { MessageOrigin } from "./message-origin";

/** The message was originally sent by a known user. */
@Inspectable()
export class MessageOriginUser extends MessageOrigin {
	constructor(public payload: TelegramObjects.TelegramMessageOriginUser) {
		super(payload);
	}

	/** Type of the message origin, always `user` */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/** Date the message was sent originally in Unix time */
	@Inspect()
	get date() {
		return this.payload.date;
	}

	/** User that sent the message originally */
	@Inspect()
	get senderUser() {
		return new User(this.payload.sender_user);
	}
}

memoizeGetters(MessageOriginUser, ["senderUser"]);
