import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { ChatMemberUpdated } from "../structures";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor, type Require, type UpdateName } from "#utils";

import { Context } from "./context";
import {
	ChatActionMixin,
	ChatControlMixin,
	CloneMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface ChatMemberContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChatMemberUpdated;
	updateId: number;
	type?: UpdateName;
}

class ChatMemberContext extends Context {
	payload: TelegramObjects.TelegramChatMemberUpdated;

	constructor(options: ChatMemberContextOptions) {
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
interface ChatMemberContext
	extends Constructor<ChatMemberContext>,
		ChatMemberUpdated,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		ChatControlMixin,
		CloneMixin<ChatMemberContext, ChatMemberContextOptions> {}
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
