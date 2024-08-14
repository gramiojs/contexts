import type { TelegramObjects } from "@gramio/types";

import { ReactionType } from "./reaction-type";

/**
 * The reaction is paid.
 *
 * [Documentation](https://core.telegram.org/bots/api#reactiontypepaid)
 */
export class ReactionTypePaid extends ReactionType {
	constructor(public payload: TelegramObjects.TelegramReactionTypePaid) {
		super(payload);
	}

	/** Type of the reaction, always `emoji` */
	get type() {
		return this.payload.type;
	}
}
