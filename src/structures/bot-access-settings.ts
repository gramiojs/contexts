import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { User } from "./user";

/**
 * Describes the access settings of a bot.
 *
 * [Documentation](https://core.telegram.org/bots/api/#botaccesssettings)
 */
@Inspectable()
export class BotAccessSettings {
	constructor(public payload: TelegramObjects.TelegramBotAccessSettings) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** `true`, if only selected users can access the bot. The bot's owner can always access it. */
	@Inspect({ compute: true })
	isAccessRestricted() {
		return this.payload.is_access_restricted;
	}

	/** *Optional*. The list of other users who have access to the bot if the access is restricted */
	@Inspect({ nullable: false })
	get addedUsers() {
		const { added_users } = this.payload;

		if (!added_users) return undefined;

		return added_users.map((user) => new User(user));
	}
}

memoizeGetters(BotAccessSettings, ["addedUsers"]);
