import type { TelegramObjects } from "@gramio/types";
import { MessageReactionUpdated } from "../structures/message-reaction-updated";
import type { Constructor, Require } from "../types";

import { inspectable } from "inspectable";
import type { BotLike } from "../types";
import { applyMixins, filterPayload } from "../utils";
import { Context } from "./context";
import { CloneMixin, NodeMixin, SendMixin } from "./mixins/index";

interface MessageReactionContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessageReactionUpdated;
	updateId: number;
}

/** This object represents a change of a reaction on a message performed by a user. */
class MessageReactionContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessageReactionUpdated;

	constructor(options: MessageReactionContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "message_reaction",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Checks if context has the `user` property */
	hasUser(): this is Require<this, "user"> {
		return this.user !== undefined;
	}

	/** Checks if context has the `actorChat` property */
	hasActorChat(): this is Require<this, "actorChat"> {
		return this.actorChat !== undefined;
	}
}

interface MessageReactionContext<Bot extends BotLike>
	extends Constructor<MessageReactionContext<Bot>>,
		MessageReactionUpdated,
		SendMixin<Bot>,
		NodeMixin<Bot>,
		CloneMixin<
			Bot,
			MessageReactionContext<Bot>,
			MessageReactionContextOptions<Bot>
		> {}
applyMixins(MessageReactionContext, [
	MessageReactionUpdated,
	SendMixin,
	NodeMixin,
	CloneMixin,
]);

export { MessageReactionContext };

inspectable(MessageReactionContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: MessageReactionContext<any>) {
		const payload = {
			id: context.id,
			chat: context.chat,
			user: context.user,
			actorChat: context.actorChat,
			date: context.date,
			oldReactions: context.oldReactions,
			newReactions: context.newReactions,
		};

		return filterPayload(payload);
	},
});
