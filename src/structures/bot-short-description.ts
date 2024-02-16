import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

/** This object represents the bot's short description. */
@Inspectable()
export class BotShortDescription {
	constructor(public payload: TelegramObjects.TelegramBotShortDescription) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The bot's short description */
	@Inspect()
	get description() {
		return this.payload.short_description;
	}
}
