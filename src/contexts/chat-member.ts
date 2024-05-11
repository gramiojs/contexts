import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { ChatMemberUpdated } from "../structures/index";

import type { Constructor, Require, UpdateName } from "../types";
import { applyMixins } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatControlMixin,
	CloneMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface ChatMemberContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChatMemberUpdated;
	updateId: number;
	type?: UpdateName;
}

class ChatMemberContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramChatMemberUpdated;

	constructor(options: ChatMemberContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: options.type ?? "chat_member",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Does this update have `invite_link` property? */
	hasInviteLink(): this is Require<this, "inviteLink"> {
		return this.inviteLink !== undefined;
	}
}

// @ts-expect-error [senderId: number] is not compatible with [senderId: number | undefined] :shrug:
interface ChatMemberContext<Bot extends BotLike>
	extends Constructor<ChatMemberContext<Bot>>,
		ChatMemberUpdated,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		ChatControlMixin<Bot>,
		CloneMixin<Bot, ChatMemberContext<Bot>, ChatMemberContextOptions<Bot>> {}
applyMixins(ChatMemberContext, [
	ChatMemberUpdated,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	ChatControlMixin,
	CloneMixin,
]);

inspectable(ChatMemberContext, {
	serialize(context) {
		return {
			senderId: context.senderId,
			chatId: context.chatId,
			chatType: context.chatType,
			oldChatMember: context.oldChatMember,
			newChatMember: context.newChatMember,
			date: context.date,
			inviteLink: context.inviteLink,
		};
	},
});

export { ChatMemberContext };
