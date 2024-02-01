import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";
import { Message, User } from "../structures";

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

interface LeftChatMemberContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

class LeftChatMemberContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: LeftChatMemberContextOptions) {
		super({
			bot: options.bot,
			updateType: "left_chat_member",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Left chat member */
	get eventMember() {
		return new User(this.payload.left_chat_member as Interfaces.TelegramUser);
	}
}

interface LeftChatMemberContext
	extends Constructor<LeftChatMemberContext>,
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
		CloneMixin<LeftChatMemberContext, LeftChatMemberContextOptions> {}
applyMixins(LeftChatMemberContext, [
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
memoizeGetters(LeftChatMemberContext, ["eventMember"]);

inspectable(LeftChatMemberContext, {
	serialize(context) {
		return {
			id: context.id,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventMember: context.eventMember,
		};
	},
});

export { LeftChatMemberContext };
