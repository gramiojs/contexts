import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Chat } from "./chat";

@Inspectable()
export class Story {
	constructor(public payload: TelegramObjects.TelegramStory) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique identifier for the story in the chat */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/** Chat that posted the story */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}
}
