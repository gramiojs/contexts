import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";
import { Message, User } from "../structures";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
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

interface NewChatMembersContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

class NewChatMembersContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: NewChatMembersContextOptions) {
		super({
			bot: options.bot,
			updateType: "new_chat_members",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** New chat members */
	get eventMembers() {
		const members = this.payload.new_chat_members as Interfaces.TelegramUser[];

		return members.map((member) => new User(member));
	}
}

interface NewChatMembersContext
	extends Constructor<NewChatMembersContext>,
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
		CloneMixin<NewChatMembersContext, NewChatMembersContextOptions> {}
applyMixins(NewChatMembersContext, [
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

inspectable(NewChatMembersContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventMembers: context.eventMembers,
		};
	},
});

export { NewChatMembersContext };
