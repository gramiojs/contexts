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

interface NewChatTitleContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class NewChatTitleContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: NewChatTitleContextOptions<Bot>) {
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

interface NewChatTitleContext<Bot extends BotLike>
	extends Constructor<NewChatTitleContext<Bot>>,
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
			NewChatTitleContext<Bot>,
			NewChatTitleContextOptions<Bot>
		> {}
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
