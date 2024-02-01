import * as Interfaces from "@gramio/types/objects";
import { Message } from "../structures";

import type { Bot } from "gramio";
import { applyMixins, filterPayload } from "#utils";
import type { Constructor, Require, RequireValue } from "#utils";

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

interface ForumTopicEditedContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about an edited forum topic. */
class ForumTopicEditedContext extends Context {
	payload: Interfaces.TelegramMessage;

	private event: Interfaces.TelegramForumTopicEdited;

	constructor(options: ForumTopicEditedContextOptions) {
		super({
			bot: options.bot,
			updateType: "forum_topic_edited",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.forum_topic_edited as Interfaces.TelegramForumTopicEdited;
	}

	/** New name of the topic, if it was edited */
	get name() {
		return this.event.name;
	}

	/** Checks whether the `name` property has been edited */
	hasName(): this is Require<this, "name"> {
		return this.name !== undefined;
	}

	/** New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
	get iconCustomEmojiId() {
		return this.event.icon_custom_emoji_id;
	}

	/** Checks whether the `iconCustomEmojiId` property has been edited */
	hasIconCustomEmojiId(): this is Require<this, "iconCustomEmojiId"> {
		return this.iconCustomEmojiId !== undefined;
	}
}

interface ForumTopicEditedContext
	extends Constructor<ForumTopicEditedContext>,
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
		CloneMixin<ForumTopicEditedContext, ForumTopicEditedContextOptions> {}
applyMixins(ForumTopicEditedContext, [
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

inspectable(ForumTopicEditedContext, {
	serialize(context) {
		const payload = {
			name: context.name,
			iconCustomEmojiId: context.iconCustomEmojiId,
		};

		return filterPayload(payload);
	},
});

export { ForumTopicEditedContext };
