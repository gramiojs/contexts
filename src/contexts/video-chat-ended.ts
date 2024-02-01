import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";
import { Message, VideoChatEnded } from "../structures";

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

interface VideoChatEndedContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

class VideoChatEndedContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: VideoChatEndedContextOptions) {
		super({
			bot: options.bot,
			updateType: "video_chat_ended",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Service message: video chat ended */
	get eventEnded() {
		return new VideoChatEnded(
			this.payload.video_chat_ended as Interfaces.TelegramVideoChatEnded,
		);
	}
}

interface VideoChatEndedContext
	extends Constructor<VideoChatEndedContext>,
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
		CloneMixin<VideoChatEndedContext, VideoChatEndedContextOptions> {}
applyMixins(VideoChatEndedContext, [
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
memoizeGetters(VideoChatEndedContext, ["eventEnded"]);

inspectable(VideoChatEndedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventEnded: context.eventEnded,
		};
	},
});

export { VideoChatEndedContext };
