import { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { MessageReactionCountUpdated } from "../structures/message-reaction-count-updated";

import { BotLike } from "#types";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";
import { Context } from "./context";
import { CloneMixin, NodeMixin, SendMixin } from "./mixins";

interface MessageReactionCountContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessageReactionCountUpdated;
	updateId: number;
}

/** This object represents reaction changes on a message with anonymous reactions. */
class MessageReactionCountContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessageReactionCountUpdated;

	constructor(options: MessageReactionCountContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "message_reaction_count",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface MessageReactionCountContext<Bot extends BotLike>
	extends Constructor<MessageReactionCountContext<Bot>>,
		MessageReactionCountUpdated,
		SendMixin<Bot>,
		NodeMixin<Bot>,
		CloneMixin<
			Bot,
			MessageReactionCountContext<Bot>,
			MessageReactionCountContextOptions<Bot>
		> {}
applyMixins(MessageReactionCountContext, [
	MessageReactionCountUpdated,
	SendMixin,
	NodeMixin,
	CloneMixin,
]);

export { MessageReactionCountContext };

inspectable(MessageReactionCountContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: MessageReactionCountContext<any>) {
		const payload = {
			id: context.id,
			chat: context.chat,
			date: context.date,
			reactions: context.reactions,
		};

		return payload;
	},
});
