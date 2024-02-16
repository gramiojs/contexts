import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";
import { Message } from "../structures";

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

interface GroupChatCreatedContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class GroupChatCreatedContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: GroupChatCreatedContextOptions) {
		super({
			bot: options.bot,
			updateType: "group_chat_created",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface GroupChatCreatedContext
	extends Constructor<GroupChatCreatedContext>,
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
		CloneMixin<GroupChatCreatedContext, GroupChatCreatedContextOptions> {}
applyMixins(GroupChatCreatedContext, [
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

inspectable(GroupChatCreatedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
		};
	},
});

export { GroupChatCreatedContext };
