import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents the bot's description. */
@Inspectable()
export class BotDescription {
	constructor(public payload: TelegramObjects.TelegramBotDescription) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The bot's description */
	@Inspect()
	get description() {
		return this.payload.description;
	}
}
