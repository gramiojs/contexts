import { inspectable } from "inspectable";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import type { TelegramObjects } from "@gramio/types";
import { ChatJoinRequest } from "../structures/index";

import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatInviteControlMixin,
	CloneMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface ChatJoinRequestContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChatJoinRequest;
	updateId: number;
}

/**
 * Represents a join request sent to a chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#chatjoinrequest)
 */
class ChatJoinRequestContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramChatJoinRequest;

	constructor(options: ChatJoinRequestContextOptions<Bot>) {
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
interface ChatJoinRequestContext<Bot extends BotLike>
	extends Constructor<ChatJoinRequestContext<Bot>>,
		ChatJoinRequest,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		CloneMixin<
			Bot,
			ChatJoinRequestContext<Bot>,
			ChatJoinRequestContextOptions<Bot>
		> {}
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
