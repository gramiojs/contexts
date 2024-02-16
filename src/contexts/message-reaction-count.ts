import { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { MessageReactionCountUpdated } from "../structures/message-reaction-count-updated";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";
import { Context } from "./context";
import { CloneMixin, NodeMixin, SendMixin } from "./mixins";

interface MessageReactionCountContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessageReactionCountUpdated;
	updateId: number;
}

/** This object represents reaction changes on a message with anonymous reactions. */
class MessageReactionCountContext extends Context {
	payload: TelegramObjects.TelegramMessageReactionCountUpdated;

	constructor(options: MessageReactionCountContextOptions) {
		super({
			bot: options.bot,
			updateType: "message_reaction_count",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface MessageReactionCountContext
	extends Constructor<MessageReactionCountContext>,
		MessageReactionCountUpdated,
		SendMixin,
		NodeMixin,
		CloneMixin<
			MessageReactionCountContext,
			MessageReactionCountContextOptions
		> {}
applyMixins(MessageReactionCountContext, [
	MessageReactionCountUpdated,
	SendMixin,
	NodeMixin,
	CloneMixin,
]);

export { MessageReactionCountContext };

inspectable(MessageReactionCountContext, {
	serialize(context: MessageReactionCountContext) {
		const payload = {
			id: context.id,
			chat: context.chat,
			date: context.date,
			reactions: context.reactions,
		};

		return payload;
	},
});
