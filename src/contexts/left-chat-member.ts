import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Message, User } from "../structures";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

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
} from "./mixins/index";

interface LeftChatMemberContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class LeftChatMemberContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: LeftChatMemberContextOptions<Bot>) {
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
		return new User(
			this.payload.left_chat_member as TelegramObjects.TelegramUser,
		);
	}
}

interface LeftChatMemberContext<Bot extends BotLike>
	extends Constructor<LeftChatMemberContext<Bot>>,
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
			LeftChatMemberContext<Bot>,
			LeftChatMemberContextOptions<Bot>
		> {}
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
