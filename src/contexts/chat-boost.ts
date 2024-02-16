import { TelegramObjects } from "@gramio/types";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";
import { ChatBoostUpdated } from "../structures/chat-boost-updated";

import { inspectable } from "inspectable";
import { Context } from "./context";
import { CloneMixin, SendMixin } from "./mixins";

interface ChatBoostContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChatBoostUpdated;
	updateId: number;
}

/** This object represents a boost added to a chat or changed. */
class ChatBoostContext extends Context {
	payload: TelegramObjects.TelegramChatBoostUpdated;

	constructor(options: ChatBoostContextOptions) {
		super({
			bot: options.bot,
			updateType: "chat_boost",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface ChatBoostContext
	extends Constructor<ChatBoostContext>,
		ChatBoostUpdated,
		SendMixin,
		CloneMixin<ChatBoostContext, ChatBoostContextOptions> {}
applyMixins(ChatBoostContext, [ChatBoostUpdated, SendMixin, CloneMixin]);

export { ChatBoostContext };

inspectable(ChatBoostContext, {
	serialize(context: ChatBoostContext) {
		const payload = {
			chat: context.chat,
			boost: context.boost,
		};

		return payload;
	},
});
