import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { Message, VideoChatScheduled } from "../structures";

import type { Bot } from "gramio";
import { applyMixins, memoizeGetters } from "#utils";
import { type Constructor } from "#utils";

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
} from "./mixins";

interface VideoChatScheduledContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class VideoChatScheduledContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: VideoChatScheduledContextOptions) {
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

interface VideoChatScheduledContext
	extends Constructor<VideoChatScheduledContext>,
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
		CloneMixin<VideoChatScheduledContext, VideoChatScheduledContextOptions> {}
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
