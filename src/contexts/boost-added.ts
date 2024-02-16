import { TelegramObjects } from "@gramio/types";
import { Message } from "../structures";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";

import { inspectable } from "inspectable";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatControlMixin,
	ChatInviteControlMixin,
	ChatMemberControlMixin,
	ChatSenderControlMixin,
	CloneMixin,
	ForumMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface BoostAddedContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
class BoostAddedContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: BoostAddedContextOptions) {
		super({
			bot: options.bot,
			updateType: "boost_added",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface BoostAddedContext
	extends Constructor<BoostAddedContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		ForumMixin,
		ChatInviteControlMixin,
		ChatControlMixin,
		ChatSenderControlMixin,
		ChatMemberControlMixin,
		PinsMixin,
		CloneMixin<BoostAddedContext, BoostAddedContextOptions> {}
applyMixins(BoostAddedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ForumMixin,
	ChatInviteControlMixin,
	ChatControlMixin,
	ChatSenderControlMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(BoostAddedContext, {
	serialize(context) {
		return {};
	},
});

export { BoostAddedContext };
