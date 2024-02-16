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

interface NewChatTitleContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class NewChatTitleContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: NewChatTitleContextOptions) {
		super({
			bot: options.bot,
			updateType: "new_chat_title",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** New chat title */
	get eventTitle() {
		return this.payload.new_chat_title as string;
	}
}

interface NewChatTitleContext
	extends Constructor<NewChatTitleContext>,
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
		CloneMixin<NewChatTitleContext, NewChatTitleContextOptions> {}
applyMixins(NewChatTitleContext, [
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

inspectable(NewChatTitleContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventTitle: context.eventTitle,
		};
	},
});

export { NewChatTitleContext };
