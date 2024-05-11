import type { TelegramObjects } from "@gramio/types";

import { ReactionType } from "./reaction-type/index";

export class ReactionTypeCustomEmoji extends ReactionType {
	constructor(public payload: TelegramObjects.TelegramReactionTypeCustomEmoji) {
		super(payload);
	}

	/** Type of the reaction, always `custom_emoji` */
	get type() {
		return this.payload.type;
	}

	/** Custom emoji identifier */
	get customEmoji() {
		return this.payload.custom_emoji_id;
	}
}
