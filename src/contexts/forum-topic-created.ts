import * as Interfaces from "@gramio/types/objects";
import { Message } from "../structures";

import type { Bot } from "gramio";
import { applyMixins, filterPayload } from "#utils";
import type { Constructor, Require } from "#utils";

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

interface ForumTopicCreatedContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a new forum topic created in the chat. */
class ForumTopicCreatedContext extends Context {
	payload: Interfaces.TelegramMessage;

	private event: Interfaces.TelegramForumTopicCreated;

	constructor(options: ForumTopicCreatedContextOptions) {
		super({
			bot: options.bot,
			updateType: "forum_topic_created",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.forum_topic_created as Interfaces.TelegramForumTopicCreated;
	}

	/** Name of the topic */
	get name() {
		return this.event.name;
	}

	/** Color of the topic icon in RGB format */
	get iconColor() {
		return this.event.icon_color;
	}

	/** Unique identifier of the custom emoji shown as the topic icon */
	get iconCustomEmojiId() {
		return this.event.icon_custom_emoji_id;
	}

	/** Checks whether the event has `iconCustomEmojiId` property */
	hasIconCustomEmojiId(): this is Require<this, "iconCustomEmojiId"> {
		return this.iconCustomEmojiId !== undefined;
	}
}

interface ForumTopicCreatedContext
	extends Constructor<ForumTopicCreatedContext>,
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
		CloneMixin<ForumTopicCreatedContext, ForumTopicCreatedContextOptions> {}
applyMixins(ForumTopicCreatedContext, [
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

inspectable(ForumTopicCreatedContext, {
	serialize(context) {
		const payload = {
			name: context.name,
			iconColor: context.iconColor,
			iconCustomEmojiId: context.iconCustomEmojiId,
		};

		return filterPayload(payload);
	},
});

export { ForumTopicCreatedContext };
