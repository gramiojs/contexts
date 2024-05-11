import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";

/**
 * This object represents a chat background.
 *
 * [Documentation](https://core.telegram.org/bots/api/#chatbackground)
 */
@Inspectable()
export class ChatBackground {
	constructor(public payload: TelegramObjects.TelegramChatBackground) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the background
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}
}
