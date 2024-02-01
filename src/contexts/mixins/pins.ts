import * as Params from "@gramio/types/params";

import type { Optional } from "#utils";

import { Context } from "../context";
import { NodeMixin } from "./node";
import { TargetMixin } from "./target";

/** This object represents a mixin that ensures you have methods to pin/unpin messages in the chat */
class PinsMixin {
	/** Adds message to the list of pinned messages */
	pinChatMessage(
		params?: Optional<Params.PinChatMessageParams, "chat_id" | "message_id">,
	) {
		return this.bot.api.pinChatMessage({
			chat_id: this.chatId,
			message_id: this.id,
			...params,
		});
	}

	/** Removes message from the list of pinned messages  */
	unpinChatMessage(
		params?: Optional<Params.UnpinChatMessageParams, "chat_id" | "message_id">,
	) {
		return this.bot.api.unpinChatMessage({
			chat_id: this.chatId,
			message_id: this.id,
			...params,
		});
	}

	/** Clears the list of pinned messages */
	unpinAllChatMessages(
		params?: Optional<Params.UnpinAllChatMessagesParams, "chat_id">,
	) {
		return this.bot.api.unpinAllChatMessages({
			chat_id: this.chatId,
			...params,
		});
	}
}

interface PinsMixin extends Context, TargetMixin, NodeMixin {}

export { PinsMixin };
