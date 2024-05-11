import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { Location } from "./location";
import { User } from "./user";

/**
 * This object represents an incoming inline query.
 * When the user sends an empty query, your bot could return some default or
 * trending results.
 */
@Inspectable()
export class InlineQuery {
	constructor(public payload: TelegramObjects.TelegramInlineQuery) {}

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

	/** Sender location, only for bots that request user location */
	@Inspect({ nullable: false })
	get location() {
		const { location } = this.payload;

		if (!location) return undefined;

		return new Location(location);
	}

	/** Text of the query (up to 256 characters) */
	@Inspect()
	get query() {
		return this.payload.query;
	}

	/** Offset of the results to be returned, can be controlled by the bot */
	@Inspect()
	get offset() {
		return this.payload.offset;
	}
}

memoizeGetters(InlineQuery, ["from", "location"]);
