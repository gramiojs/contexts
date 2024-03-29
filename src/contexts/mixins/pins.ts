import { TelegramParams } from "@gramio/types";

import type { Optional } from "#types";

import { BotLike } from "#types";
import { Context } from "../context";
import { NodeMixin } from "./node";
import { TargetMixin } from "./target";

/** This object represents a mixin that ensures you have methods to pin/unpin messages in the chat */
class PinsMixin<Bot extends BotLike> {
	/** Adds message to the list of pinned messages */
	pinChatMessage(
		params?: Optional<
			TelegramParams.PinChatMessageParams,
			"chat_id" | "message_id"
		>,
	) {
		return this.bot.api.pinChatMessage({
			chat_id: this.chatId,
			message_id: this.id,
			...params,
		});
	}

	/** Removes message from the list of pinned messages  */
	unpinChatMessage(
		params?: Optional<
			TelegramParams.UnpinChatMessageParams,
			"chat_id" | "message_id"
		>,
	) {
		return this.bot.api.unpinChatMessage({
			chat_id: this.chatId,
			message_id: this.id,
			...params,
		});
	}

	/** Clears the list of pinned messages */
	unpinAllChatMessages(
		params?: Optional<TelegramParams.UnpinAllChatMessagesParams, "chat_id">,
	) {
		return this.bot.api.unpinAllChatMessages({
			chat_id: this.chatId,
			...params,
		});
	}
}

interface PinsMixin<Bot extends BotLike>
	extends Context<Bot>,
		TargetMixin,
		NodeMixin<Bot> {}

export { PinsMixin };
