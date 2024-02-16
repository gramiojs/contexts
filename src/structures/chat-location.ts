import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "#utils";
import { Location } from "./location";

/** Represents a location to which a chat is connected. */
@Inspectable()
export class ChatLocation {
	constructor(public payload: TelegramObjects.TelegramChatLocation) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The location to which the supergroup is connected. Can't be a live location. */
	@Inspect()
	get location() {
		return new Location(this.payload.location);
	}

	/** Location address; `1-64` characters, as defined by the chat owner */
	@Inspect()
	get address() {
		return this.payload.address;
	}
}

memoizeGetters(ChatLocation, ["location"]);
