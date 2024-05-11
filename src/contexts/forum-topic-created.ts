import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor, Require } from "../types";
import { applyMixins, filterPayload } from "../utils";

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

interface ForumTopicCreatedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a new forum topic created in the chat. */
class ForumTopicCreatedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramForumTopicCreated;

	constructor(options: ForumTopicCreatedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "forum_topic_created",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.forum_topic_created as TelegramObjects.TelegramForumTopicCreated;
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

interface ForumTopicCreatedContext<Bot extends BotLike>
	extends Constructor<ForumTopicCreatedContext<Bot>>,
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
			ForumTopicCreatedContext<Bot>,
			ForumTopicCreatedContextOptions<Bot>
		> {}
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
