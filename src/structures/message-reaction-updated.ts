import * as Interfaces from "@gramio/types/objects";

import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "#utils";
import { Chat } from "./chat";
import { User } from "./user";

/** This object represents a change of a reaction on a message performed by a user. */
@Inspectable()
export class MessageReactionUpdated {
	constructor(public payload: Interfaces.TelegramMessageReactionUpdated) {}

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

	/** The user that changed the reaction, if the user isn't anonymous */
	@Inspect({ nullable: false })
	get user() {
		const { user } = this.payload;

		if (!user) return undefined;

		return new User(user);
	}

	/** The chat on behalf of which the reaction was changed, if the user is anonymous */
	@Inspect({ nullable: false })
	get actorChat() {
		const { actor_chat } = this.payload;

		if (!actor_chat) return undefined;

		return new Chat(actor_chat);
	}

	/** Date of the change in Unix time */
	@Inspect()
	get date() {
		return this.payload.date;
	}

	/** Previous list of reaction types that were set by the user */
	@Inspect({ nullable: false })
	get oldReactions() {
		return this.payload.old_reaction;
	}

	/** New list of reaction types that have been set by the user */
	@Inspect({ nullable: false })
	get newReactions() {
		return this.payload.new_reaction;
	}
}

memoizeGetters(MessageReactionUpdated, ["chat", "user", "actorChat"]);
