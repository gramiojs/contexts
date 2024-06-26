import type { TelegramObjects } from "@gramio/types";

import { ChatBoostUpdated } from "../structures/chat-boost-updated";
import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import { inspectable } from "inspectable";
import type { BotLike } from "../types";
import { Context } from "./context";
import { CloneMixin, SendMixin } from "./mixins/index";

interface ChatBoostContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChatBoostUpdated;
	updateId: number;
}

/** This object represents a boost added to a chat or changed. */
class ChatBoostContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramChatBoostUpdated;

	constructor(options: ChatBoostContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "chat_boost",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface ChatBoostContext<Bot extends BotLike>
	extends Constructor<ChatBoostContext<Bot>>,
		ChatBoostUpdated,
		SendMixin<Bot>,
		CloneMixin<Bot, ChatBoostContext<Bot>, ChatBoostContextOptions<Bot>> {}
applyMixins(ChatBoostContext, [ChatBoostUpdated, SendMixin, CloneMixin]);

export { ChatBoostContext };

inspectable(ChatBoostContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: ChatBoostContext<any>) {
		const payload = {
			chat: context.chat,
			boost: context.boost,
		};

		return payload;
	},
});
