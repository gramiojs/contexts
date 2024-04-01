import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Message, User } from "../structures";

import type { Constructor } from "#types";
import { applyMixins } from "#utils";

import type { BotLike } from "#types";
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

interface NewChatMembersContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class NewChatMembersContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: NewChatMembersContextOptions<Bot>) {
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
		const members = this.payload
			.new_chat_members as TelegramObjects.TelegramUser[];

		return members.map((member) => new User(member));
	}
}

interface NewChatMembersContext<Bot extends BotLike>
	extends Constructor<NewChatMembersContext<Bot>>,
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
			NewChatMembersContext<Bot>,
			NewChatMembersContextOptions<Bot>
		> {}
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
