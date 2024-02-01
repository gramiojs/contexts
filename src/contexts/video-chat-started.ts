import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";
import { Message, VideoChatStarted } from "../structures";

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

interface VideoChatStartedContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

class VideoChatStartedContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: VideoChatStartedContextOptions) {
		super({
			bot: options.bot,
			updateType: "video_chat_started",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Service message: video chat started */
	get eventStarted() {
		return new VideoChatStarted(
			this.payload.video_chat_started as Interfaces.TelegramVideoChatStarted,
		);
	}
}

interface VideoChatStartedContext
	extends Constructor<VideoChatStartedContext>,
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
		CloneMixin<VideoChatStartedContext, VideoChatStartedContextOptions> {}
applyMixins(VideoChatStartedContext, [
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
memoizeGetters(VideoChatStartedContext, ["eventStarted"]);

inspectable(VideoChatStartedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventStarted: context.eventStarted,
		};
	},
});

export { VideoChatStartedContext };
