import type { TelegramParams } from "@gramio/types";
import type { Optional } from "#types";

import type { Context } from "../context";

import type { BotLike } from "#types";
import type { TargetMixin } from "./target";

/** This object is a mixin that does all the chat-sender stuff, right? */
class ChatSenderControlMixin<Bot extends BotLike> {
	/** Bans a channel chat */
	banChatSender(
		senderChatId: number,
		params?: Optional<
			TelegramParams.BanChatSenderChatParams,
			"chat_id" | "sender_chat_id"
		>,
	) {
		return this.bot.api.banChatSenderChat({
			chat_id: this.chatId,
			sender_chat_id: senderChatId,
			...params,
		});
	}

	/** Unbans a channel chat */
	unbanChatSender(
		senderChatId: number,
		params?: Optional<
			TelegramParams.UnbanChatSenderChatParams,
			"chat_id" | "sender_chat_id"
		>,
	) {
		return this.bot.api.unbanChatSenderChat({
			chat_id: this.chatId,
			sender_chat_id: senderChatId,
			...params,
		});
	}
}

interface ChatSenderControlMixin<Bot extends BotLike>
	extends Context<Bot>,
		TargetMixin {}

export { ChatSenderControlMixin };
