import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { Message, VideoChatParticipantsInvited } from "../structures";

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

interface VideoChatParticipantsInvitedContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class VideoChatParticipantsInvitedContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: VideoChatParticipantsInvitedContextOptions) {
		super({
			bot: options.bot,
			updateType: "video_chat_participants_invited",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Service message: new participants invited to a video chat */
	get eventParticipantsInvited() {
		return new VideoChatParticipantsInvited(
			this.payload
				.video_chat_participants_invited as TelegramObjects.TelegramVideoChatParticipantsInvited,
		);
	}
}

interface VideoChatParticipantsInvitedContext
	extends Constructor<VideoChatParticipantsInvitedContext>,
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
		CloneMixin<
			VideoChatParticipantsInvitedContext,
			VideoChatParticipantsInvitedContextOptions
		> {}
applyMixins(VideoChatParticipantsInvitedContext, [
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
memoizeGetters(VideoChatParticipantsInvitedContext, [
	"eventParticipantsInvited",
]);

inspectable(VideoChatParticipantsInvitedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventParticipantsInvited: context.eventParticipantsInvited,
		};
	},
});

export { VideoChatParticipantsInvitedContext };
