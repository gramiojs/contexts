import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { Location } from "./location";
import { User } from "./user";

/** Represents a result of an inline query that was chosen by the user and sent to their chat partner. */
@Inspectable()
export class ChosenInlineResult {
	constructor(public payload: TelegramObjects.TelegramChosenInlineResult) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The unique identifier for the result that was chosen */
	@Inspect()
	get resultId() {
		return this.payload.result_id;
	}

	/** The user that chose the result */
	@Inspect()
	get from() {
		return new User(this.payload.from);
	}

	/** Sender ID */
	@Inspect()
	get senderId() {
		return this.from.id;
	}

	/** Sender location, only for bots that require user location */
	@Inspect({ nullable: false })
	get location() {
		const { location } = this.payload;

		if (!location) return undefined;

		return new Location(location);
	}

	/**
	 * Identifier of the sent inline message. Available only if there is an
	 * inline keyboard attached to the message. Will be also received in callback
	 * queries and can be used to edit the message.
	 */
	@Inspect({ nullable: false })
	get inlineMessageId() {
		return this.payload.inline_message_id;
	}

	/** The query that was used to obtain the result */
	@Inspect()
	get query() {
		return this.payload.query;
	}
}

memoizeGetters(ChosenInlineResult, ["from", "location"]);
