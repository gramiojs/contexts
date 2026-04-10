import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import { User } from "./user";

/**
 * This object contains information about the creation or token update of a bot that is managed by the current bot.
 *
 * [Documentation](https://core.telegram.org/bots/api/#managedbotupdated)
 */
@Inspectable()
export class ManagedBotUpdated {
	constructor(public payload: TelegramObjects.TelegramManagedBotUpdated) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** User that created the bot */
	@Inspect()
	get user() {
		return new User(this.payload.user);
	}

	/**
	 * Information about the bot. Token of the bot can be fetched using the method `getManagedBotToken`.
	 */
	@Inspect()
	get bot() {
		return new User(this.payload.bot);
	}
}

memoizeGetters(ManagedBotUpdated, ["user", "bot"]);
