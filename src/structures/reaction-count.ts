import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import {
	ReactionTypeCustomEmoji,
	ReactionTypeEmoji,
} from "./reaction-type/index";

/** Represents a reaction added to a message along with the number of times it was added. */
@Inspectable()
export class ReactionCount {
	constructor(public payload: TelegramObjects.TelegramReactionCount) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Type of the reaction */
	@Inspect()
	get type() {
		if (this.payload.type.type === "emoji") {
			return new ReactionTypeEmoji(this.payload.type);
		}

		if (this.payload.type.type === "custom_emoji") {
			return new ReactionTypeCustomEmoji(this.payload.type);
		}

		throw new TypeError("unknown reaction type");
	}

	/** Number of times the reaction was added */
	@Inspect()
	get totalCount() {
		return this.payload.total_count;
	}
}

memoizeGetters(ReactionCount, ["type"]);
