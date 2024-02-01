import * as Interfaces from "@gramio/types/objects";
import { Message } from "../structures";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import type { Constructor, RequireValue } from "#utils";

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

interface ForumTopicReopenedContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a forum topic reopened in the chat. Currently holds no information. */
class ForumTopicReopenedContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: ForumTopicReopenedContextOptions) {
		super({
			bot: options.bot,
			updateType: "forum_topic_reopened",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Checks whether this topic is actually a 'General' one */
	isGeneralTopic(): this is RequireValue<this, "threadId", undefined> {
		return this.threadId === undefined;
	}
}

interface ForumTopicReopenedContext
	extends Constructor<ForumTopicReopenedContext>,
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
		CloneMixin<ForumTopicReopenedContext, ForumTopicReopenedContextOptions> {}
applyMixins(ForumTopicReopenedContext, [
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

inspectable(ForumTopicReopenedContext, {
	serialize(context) {
		return {};
	},
});

export { ForumTopicReopenedContext };
