import * as Params from "@gramio/types/params";
import type { Optional } from "#utils";

import { Context } from "../context";

import { TargetMixin } from "./target";

/** This object is a mixin that does all the chat-sender stuff, right? */
class ChatSenderControlMixin {
	/** Bans a channel chat */
	banChatSender(
		senderChatId: number,
		params?: Optional<
			Params.BanChatSenderChatParams,
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
			Params.UnbanChatSenderChatParams,
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

interface ChatSenderControlMixin extends Context, TargetMixin {}

export { ChatSenderControlMixin };
