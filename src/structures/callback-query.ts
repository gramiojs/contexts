import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { InaccessibleMessage } from "./inaccessible-message";
import { Message } from "./message";
import { User } from "./user";

/**
 * This object represents an incoming callback query from a callback button in
 * an inline keyboard. If the button that originated the query was attached to
 * a message sent by the bot, the field message will be present.
 * If the button was attached to a message sent via the bot (in inline mode),
 * the field inline_message_id will be present.
 * Exactly one of the fields `data` or `game_short_name` will be present.
 */
@Inspectable()
export class CallbackQuery {
	constructor(public payload: TelegramObjects.TelegramCallbackQuery) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique identifier for this query */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/** Sender */
	@Inspect()
	get from() {
		return new User(this.payload.from);
	}

	/** Sender ID */
	get senderId() {
		return this.from.id;
	}

	/**
	 * Message sent by the bot with the callback button that originated the query
	 */
	@Inspect({ nullable: false })
	get message() {
		const { message } = this.payload;

		if (!message) return undefined;

		if (message.date === 0) {
			return new InaccessibleMessage(message);
		}

		return new Message(message);
	}

	/**
	 * Identifier of the message sent via the bot in inline mode,
	 * that originated the query.
	 */
	@Inspect({ nullable: false })
	get inlineMessageId() {
		return this.payload.inline_message_id;
	}

	/**
	 * Global identifier, uniquely corresponding to the chat to which the message
	 * with the callback button was sent. Useful for high scores in games.
	 */
	@Inspect()
	get chatInstance() {
		return this.payload.chat_instance;
	}

	/**
	 * Data associated with the callback button.
	 * Be aware that a bad client can send arbitrary data in this field.
	 */
	@Inspect({ nullable: false })
	get data() {
		return this.payload.data!;
	}

	set data(data: string) {
		this.payload.data = data;
	}

	/**
	 * Short name of a Game to be returned,
	 * serves as the unique identifier for the game
	 */
	@Inspect({ nullable: false })
	get gameShortName() {
		return this.payload.game_short_name;
	}
}

memoizeGetters(CallbackQuery, ["from", "message"]);
