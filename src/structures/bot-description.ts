import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

/** This object represents the bot's description. */
@Inspectable()
export class BotDescription {
	constructor(public payload: TelegramObjects.TelegramBotDescription) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The bot's description */
	@Inspect()
	get description() {
		return this.payload.description;
	}
}
