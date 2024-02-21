import { TelegramObjects } from "@gramio/types";
import { Message } from "../structures";

import type { Constructor, Require, RequireValue } from "#types";
import { applyMixins, filterPayload } from "#utils";

import { inspectable } from "inspectable";
import { BotLike } from "#types";
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

interface ForumTopicEditedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about an edited forum topic. */
class ForumTopicEditedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramForumTopicEdited;

	constructor(options: ForumTopicEditedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "forum_topic_edited",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.forum_topic_edited as TelegramObjects.TelegramForumTopicEdited;
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

interface ForumTopicEditedContext<Bot extends BotLike>
	extends Constructor<ForumTopicEditedContext<Bot>>,
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
			ForumTopicEditedContext<Bot>,
			ForumTopicEditedContextOptions<Bot>
		> {}
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
