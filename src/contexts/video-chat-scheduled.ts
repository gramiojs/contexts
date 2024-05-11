import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Message, VideoChatScheduled } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatControlMixin,
	ChatInviteControlMixin,
	ChatMemberControlMixin,
	ChatSenderControlMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface VideoChatScheduledContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}
/**
 * This object represents a service message about a video chat scheduled in the chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#videochatscheduled)
 */
class VideoChatScheduledContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: VideoChatScheduledContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "video_chat_scheduled",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Service message: video chat scheduled */
	get eventScheduled() {
		return new VideoChatScheduled(
			this.payload
				.video_chat_scheduled as TelegramObjects.TelegramVideoChatScheduled,
		);
	}
}

interface VideoChatScheduledContext<Bot extends BotLike>
	extends Constructor<VideoChatScheduledContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		ChatControlMixin<Bot>,
		ChatSenderControlMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			VideoChatScheduledContext<Bot>,
			VideoChatScheduledContextOptions<Bot>
		> {}
applyMixins(VideoChatScheduledContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ChatInviteControlMixin,
	ChatControlMixin,
	ChatSenderControlMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(VideoChatScheduledContext, ["eventScheduled"]);

inspectable(VideoChatScheduledContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventScheduled: context.eventScheduled,
		};
	},
});

export { VideoChatScheduledContext };
