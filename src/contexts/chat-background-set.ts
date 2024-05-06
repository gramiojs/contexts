import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures";

import type { Constructor } from "#types";
import { applyMixins } from "#utils";

import { inspectable } from "inspectable";
import { backgroundTypeMap } from "#structures/background-type";
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

interface ChatBackgroundSetContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
class ChatBackgroundSetContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: ChatBackgroundSetContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "chat_background_set",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Type of the background */
	get type() {
		return new backgroundTypeMap[this.payload.chat_background_set!.type.type](
			// @ts-expect-error
			this.payload.chat_background_set.type,
		);
	}
}

interface ChatBackgroundSetContext<Bot extends BotLike>
	extends Constructor<ChatBackgroundSetContext<Bot>>,
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
			ChatBackgroundSetContext<Bot>,
			ChatBackgroundSetContextOptions<Bot>
		> {}
applyMixins(ChatBackgroundSetContext, [
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

inspectable(ChatBackgroundSetContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			type: context.type,
		};
	},
});

export { ChatBackgroundSetContext };
