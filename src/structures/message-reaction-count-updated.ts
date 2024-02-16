import { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "#utils";
import { Chat } from "./chat";
import { ReactionTypeCustomEmoji, ReactionTypeEmoji } from "./reaction-type";
import { ReactionType } from "./reaction-type/reaction-type";

/** This object represents reaction changes on a message with anonymous reactions. */
@Inspectable()
export class MessageReactionCountUpdated {
	constructor(
		public payload: TelegramObjects.TelegramMessageReactionCountUpdated,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The chat containing the message the user reacted to */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** Unique identifier of the message inside the chat */
	@Inspect()
	get id() {
		return this.payload.message_id;
	}

	/** Date of the change in Unix time */
	@Inspect()
	get date() {
		return this.payload.date;
	}

	/** List of reactions that are present on the message */
	@Inspect()
	get reactions() {
		const reactions: ReactionType[] = [];

		for (const reaction of this.payload.reactions) {
			if (reaction.type.type === "emoji") {
				reactions.push(new ReactionTypeEmoji(reaction.type));
			} else if (reaction.type.type === "custom_emoji") {
				reactions.push(new ReactionTypeCustomEmoji(reaction.type));
			} else {
				throw new TypeError("unknown reaction type");
			}
		}

		return reactions;
	}
}

memoizeGetters(MessageReactionCountUpdated, ["chat"]);
