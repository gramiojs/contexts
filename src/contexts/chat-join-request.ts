import { inspectable } from "inspectable";

import { applyMixins } from "#utils";
import { type Constructor } from "#utils";

import * as Interfaces from "@gramio/types/objects";
import { ChatJoinRequest } from "../structures";

import type { Bot } from "gramio";

import { Context } from "./context";
import {
	ChatActionMixin,
	ChatInviteControlMixin,
	CloneMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface ChatJoinRequestContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramChatJoinRequest;
	updateId: number;
}

class ChatJoinRequestContext extends Context {
	payload: Interfaces.TelegramChatJoinRequest;

	constructor(options: ChatJoinRequestContextOptions) {
		super({
			bot: options.bot,
			updateType: "chat_join_request",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Approves chat join request */
	approve() {
		return this.bot.api.approveChatJoinRequest({
			chat_id: this.chatId,
			user_id: this.userChatId,
		});
	}

	/** Declines chat join request */
	decline() {
		return this.bot.api.declineChatJoinRequest({
			chat_id: this.chatId,
			user_id: this.userChatId,
		});
	}
}

// @ts-expect-error [senderId: number] is not compatible with [senderId: number | undefined] :shrug:
interface ChatJoinRequestContext
	extends Constructor<ChatJoinRequestContext>,
		ChatJoinRequest,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		ChatInviteControlMixin,
		CloneMixin<ChatJoinRequestContext, ChatJoinRequestContextOptions> {}
applyMixins(ChatJoinRequestContext, [
	ChatJoinRequest,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	ChatInviteControlMixin,
	CloneMixin,
]);

inspectable(ChatJoinRequestContext, {
	serialize(context) {
		return {
			chat: context.chat,
			from: context.from,
			date: context.date,
			bio: context.bio,
			inviteLink: context.inviteLink,
		};
	},
});

export { ChatJoinRequestContext };
