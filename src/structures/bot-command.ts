import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a bot command */
@Inspectable()
export class BotCommand {
	constructor(public payload: TelegramObjects.TelegramBotCommand) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
	@Inspect()
	get command() {
		return this.payload.command;
	}

	/** Description of the command; 1-256 characters */
	@Inspect()
	get description() {
		return this.payload.description;
	}
}
