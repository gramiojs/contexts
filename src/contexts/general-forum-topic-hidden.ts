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

interface GeneralForumTopicHiddenContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
class GeneralForumTopicHiddenContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: GeneralForumTopicHiddenContextOptions) {
		super({
			bot: options.bot,
			updateType: "general_forum_topic_hidden",
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

interface GeneralForumTopicHiddenContext
	extends Constructor<GeneralForumTopicHiddenContext>,
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
		CloneMixin<
			GeneralForumTopicHiddenContext,
			GeneralForumTopicHiddenContextOptions
		> {}
applyMixins(GeneralForumTopicHiddenContext, [
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

inspectable(GeneralForumTopicHiddenContext, {
	serialize(context) {
		return {};
	},
});

export { GeneralForumTopicHiddenContext };
