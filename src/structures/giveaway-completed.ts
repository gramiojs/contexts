import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import { Message } from "./message";

/** This object represents a service message about the completion of a giveaway without public winners. */
@Inspectable()
export class GiveawayCompleted {
	constructor(public payload: TelegramObjects.TelegramGiveawayCompleted) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Number of winners in the giveaway */
	@Inspect()
	get winnerCount() {
		return this.payload.winner_count;
	}

	/** Number of undistributed prizes */
	@Inspect({ nullable: false })
	get unclaimedPrizeCount() {
		return this.payload.unclaimed_prize_count;
	}

	/** Message with the giveaway that was completed, if it wasn't deleted */
	@Inspect({ nullable: false })
	get message(): Message | undefined {
		const { giveaway_message } = this.payload;

		if (!giveaway_message) return undefined;

		return new Message(giveaway_message);
	}
	get isStarGiveaway() {
		return this.payload.is_star_giveaway
	}
}

memoizeGetters(GiveawayCompleted, ["message"]);
