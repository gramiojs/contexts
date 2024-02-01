import * as Interfaces from "@gramio/types/objects";
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

interface ForumTopicClosedContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
class ForumTopicClosedContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: ForumTopicClosedContextOptions) {
		super({
			bot: options.bot,
			updateType: "forum_topic_closed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface ForumTopicClosedContext
	extends Constructor<ForumTopicClosedContext>,
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
		CloneMixin<ForumTopicClosedContext, ForumTopicClosedContextOptions> {}
applyMixins(ForumTopicClosedContext, [
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

inspectable(ForumTopicClosedContext, {
	serialize(context) {
		return {};
	},
});

export { ForumTopicClosedContext };
