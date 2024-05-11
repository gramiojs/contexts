import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { Message } from "../structures";
import type { Constructor } from "../types";
import { applyMixins } from "../utils";

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
} from "./mixins";

interface GroupChatCreatedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class GroupChatCreatedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: GroupChatCreatedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "group_chat_created",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface GroupChatCreatedContext<Bot extends BotLike>
	extends Constructor<GroupChatCreatedContext<Bot>>,
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
			GroupChatCreatedContext<Bot>,
			GroupChatCreatedContextOptions<Bot>
		> {}
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
