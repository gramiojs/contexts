import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

import { User } from "./user";

/** This object represents a service message about new members invited to a video chat. */
@Inspectable()
export class VideoChatParticipantsInvited {
	constructor(
		public payload: Interfaces.TelegramVideoChatParticipantsInvited,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** New members that were invited to the video chat */
	@Inspect()
	get users() {
		return this.payload.users.map((user) => new User(user));
	}
}
