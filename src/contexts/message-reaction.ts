import { TelegramObjects } from "@gramio/types";
import type { Constructor, Require } from "#utils";
import { MessageReactionUpdated } from "../structures/message-reaction-updated";

import type { Bot } from "gramio";
import { inspectable } from "inspectable";
import { applyMixins, filterPayload } from "#utils";
import { Context } from "./context";
import { CloneMixin, NodeMixin, SendMixin } from "./mixins";

interface MessageReactionContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessageReactionUpdated;
	updateId: number;
}

/** This object represents a change of a reaction on a message performed by a user. */
class MessageReactionContext extends Context {
	payload: TelegramObjects.TelegramMessageReactionUpdated;

	constructor(options: MessageReactionContextOptions) {
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

interface MessageReactionContext
	extends Constructor<MessageReactionContext>,
		MessageReactionUpdated,
		SendMixin,
		NodeMixin,
		CloneMixin<MessageReactionContext, MessageReactionContextOptions> {}
applyMixins(MessageReactionContext, [
	MessageReactionUpdated,
	SendMixin,
	NodeMixin,
	CloneMixin,
]);

export { MessageReactionContext };

inspectable(MessageReactionContext, {
	serialize(context: MessageReactionContext) {
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
