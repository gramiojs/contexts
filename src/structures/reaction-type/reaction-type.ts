import * as Interfaces from "@gramio/types/objects";

import type { ReactionTypeCustomEmoji } from "./custom-emoji";
import type { ReactionTypeEmoji } from "./emoji";

interface ReactionTypeMapping {
	emoji: ReactionTypeEmoji;
	custom_emoji: ReactionTypeCustomEmoji;
}

export class ReactionType {
	constructor(public payload: Interfaces.TelegramReactionType) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Is this reaction type the same as the `type`? */
	is<T extends Interfaces.TelegramReactionType["type"]>(
		type: T,
	): this is ReactionTypeMapping[T] {
		return this.payload.type === type;
	}
}
