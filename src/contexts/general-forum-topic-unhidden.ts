import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor, RequireValue } from "../types";
import { applyMixins } from "../utils";

import { inspectable } from "inspectable";
import type { BotLike } from "../types";
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
} from "./mixins/index";

interface GeneralForumTopicUnhiddenContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
class GeneralForumTopicUnhiddenContext<
	Bot extends BotLike,
> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: GeneralForumTopicUnhiddenContextOptions<Bot>) {
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

interface GeneralForumTopicUnhiddenContext<Bot extends BotLike>
	extends Constructor<GeneralForumTopicUnhiddenContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ForumMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		ChatControlMixin<Bot>,
		ChatSenderControlMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			GeneralForumTopicUnhiddenContext<Bot>,
			GeneralForumTopicUnhiddenContextOptions<Bot>
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
