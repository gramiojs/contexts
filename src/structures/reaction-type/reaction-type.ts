import { TelegramObjects } from "@gramio/types";

import type { ReactionTypeCustomEmoji } from "./custom-emoji";
import type { ReactionTypeEmoji } from "./emoji";

interface ReactionTypeMapping {
	emoji: ReactionTypeEmoji;
	custom_emoji: ReactionTypeCustomEmoji;
}

export class ReactionType {
	constructor(public payload: TelegramObjects.TelegramReactionType) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Is this reaction type the same as the `type`? */
	is<T extends TelegramObjects.TelegramReactionType["type"]>(
		type: T,
	): this is ReactionTypeMapping[T] {
		return this.payload.type === type;
	}
}
