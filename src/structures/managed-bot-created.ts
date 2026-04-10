import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import { User } from "./user";

/**
 * This object contains information about the bot that was created to be managed by the current bot.
 *
 * [Documentation](https://core.telegram.org/bots/api/#managedbotcreated)
 */
@Inspectable()
export class ManagedBotCreated {
	constructor(public payload: TelegramObjects.TelegramManagedBotCreated) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Information about the bot. The bot's token can be fetched using the method `getManagedBotToken`.
	 */
	@Inspect()
	get bot() {
		return new User(this.payload.bot);
	}
}

memoizeGetters(ManagedBotCreated, ["bot"]);
