import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { ChatBoostRemoved } from "../structures/chat-boost-removed";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import { CloneMixin, SendMixin } from "./mixins";

interface RemovedChatBoostContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChatBoostRemoved;
	updateId: number;
}

/** This object represents a boost removed from a chat. */
class RemovedChatBoostContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramChatBoostRemoved;

	constructor(options: RemovedChatBoostContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "removed_chat_boost",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface RemovedChatBoostContext<Bot extends BotLike>
	extends Constructor<RemovedChatBoostContext<Bot>>,
		ChatBoostRemoved,
		SendMixin<Bot>,
		CloneMixin<
			Bot,
			RemovedChatBoostContext<Bot>,
			RemovedChatBoostContextOptions<Bot>
		> {}
applyMixins(RemovedChatBoostContext, [ChatBoostRemoved, SendMixin, CloneMixin]);

export { RemovedChatBoostContext };

inspectable(RemovedChatBoostContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: RemovedChatBoostContext<any>) {
		const payload = {
			id: context.id,
			chat: context.chat,
			removeDate: context.removeDate,
			source: context.source,
		};

		return payload;
	},
});
