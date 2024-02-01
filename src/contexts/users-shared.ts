import * as Interfaces from "@gramio/types/objects";
import { Message } from "../structures";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";

import { inspectable } from "inspectable";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface UsersSharedContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

/** This object contains information about the users whose identifiers were shared with the bot using a `KeyboardButtonRequestUsers` button. */
class UsersSharedContext extends Context {
	payload: Interfaces.TelegramMessage;

	private event: Interfaces.TelegramUsersShared;

	constructor(options: UsersSharedContextOptions) {
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
	get sharedUserIds() {
		return this.event.user_ids;
	}
}

interface UsersSharedContext
	extends Constructor<UsersSharedContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		PinsMixin,
		CloneMixin<UsersSharedContext, UsersSharedContextOptions> {}
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
			sharedUserIds: context.sharedUserIds,
		};
	},
});

export { UsersSharedContext };
