import type { TelegramObjects } from "@gramio/types";
import { Message, SharedUser } from "../structures";

import type { Constructor } from "#types";
import { applyMixins } from "#utils";

import { inspectable } from "inspectable";
import type { BotLike } from "#types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface UsersSharedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object contains information about the users whose identifiers were shared with the bot using a `KeyboardButtonRequestUsers` button. */
class UsersSharedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramUsersShared;

	constructor(options: UsersSharedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "users_shared",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload.users_shared!;
	}

	/** Identifier of the request */
	get requestId() {
		return this.event.request_id;
	}

	/** Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
	get users() {
		return this.event.users.map((user) => new SharedUser(user));
	}
}

interface UsersSharedContext<Bot extends BotLike>
	extends Constructor<UsersSharedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<Bot, UsersSharedContext<Bot>, UsersSharedContextOptions<Bot>> {}
applyMixins(UsersSharedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(UsersSharedContext, {
	serialize(context) {
		return {
			requestId: context.requestId,
			users: context.users,
		};
	},
});

export { UsersSharedContext };
