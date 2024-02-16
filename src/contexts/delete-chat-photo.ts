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

interface DeleteChatPhotoContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class DeleteChatPhotoContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: DeleteChatPhotoContextOptions) {
		super({
			bot: options.bot,
			updateType: "delete_chat_photo",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface DeleteChatPhotoContext
	extends Constructor<DeleteChatPhotoContext>,
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
		CloneMixin<DeleteChatPhotoContext, DeleteChatPhotoContextOptions> {}
applyMixins(DeleteChatPhotoContext, [
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

inspectable(DeleteChatPhotoContext, {
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

export { DeleteChatPhotoContext };
