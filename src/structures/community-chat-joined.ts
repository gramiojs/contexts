import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { Community } from "./community";

/** A service event describing a chat joining an existing community. */
@Inspectable()
export class CommunityChatJoined {
	constructor(public payload: TelegramObjects.TelegramCommunityChatJoined) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The community from which the chat was joined. */
	@Inspect()
	get community() {
		return new Community(this.payload.community);
	}
}

memoizeGetters(CommunityChatJoined, ["community"]);
