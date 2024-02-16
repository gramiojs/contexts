import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { Message, PhotoSize } from "../structures";

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

interface NewChatPhotoContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class NewChatPhotoContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: NewChatPhotoContextOptions) {
		super({
			bot: options.bot,
			updateType: "new_chat_photo",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** New chat photo */
	get eventPhoto() {
		const sizes = this.payload
			.new_chat_photo as TelegramObjects.TelegramPhotoSize[];

		return sizes.map((size) => new PhotoSize(size));
	}
}

interface NewChatPhotoContext
	extends Constructor<NewChatPhotoContext>,
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
		CloneMixin<NewChatPhotoContext, NewChatPhotoContextOptions> {}
applyMixins(NewChatPhotoContext, [
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

inspectable(NewChatPhotoContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventPhoto: context.eventPhoto,
		};
	},
});

export { NewChatPhotoContext };
