import { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { ChatBoostRemoved } from "../structures/chat-boost-removed";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";

import { Context } from "./context";
import { CloneMixin, SendMixin } from "./mixins";

interface RemovedChatBoostContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChatBoostRemoved;
	updateId: number;
}

/** This object represents a boost removed from a chat. */
class RemovedChatBoostContext extends Context {
	payload: TelegramObjects.TelegramChatBoostRemoved;

	constructor(options: RemovedChatBoostContextOptions) {
		super({
			bot: options.bot,
			updateType: "removed_chat_boost",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface RemovedChatBoostContext
	extends Constructor<RemovedChatBoostContext>,
		ChatBoostRemoved,
		SendMixin,
		CloneMixin<RemovedChatBoostContext, RemovedChatBoostContextOptions> {}
applyMixins(RemovedChatBoostContext, [ChatBoostRemoved, SendMixin, CloneMixin]);

export { RemovedChatBoostContext };

inspectable(RemovedChatBoostContext, {
	serialize(context: RemovedChatBoostContext) {
		const payload = {
			id: context.id,
			chat: context.chat,
			removeDate: context.removeDate,
			source: context.source,
		};

		return payload;
	},
});
