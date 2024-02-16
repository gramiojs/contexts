import { TelegramObjects } from "@gramio/types";
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

interface GeneralForumTopicUnhiddenContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
class GeneralForumTopicUnhiddenContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: GeneralForumTopicUnhiddenContextOptions) {
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

interface GeneralForumTopicUnhiddenContext
	extends Constructor<GeneralForumTopicUnhiddenContext>,
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
			GeneralForumTopicUnhiddenContext,
			GeneralForumTopicUnhiddenContextOptions
		> {}
applyMixins(GeneralForumTopicUnhiddenContext, [
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

inspectable(GeneralForumTopicUnhiddenContext, {
	serialize(context) {
		return {};
	},
});

export { GeneralForumTopicUnhiddenContext };
