import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/** This object represents a service message about the creation of a scheduled giveaway. Currently holds no information. */
@Inspectable()
export class GiveawayCreated {
	constructor(public payload: TelegramObjects.TelegramGiveawayCreated) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only */
	@Inspect({ nullable: false })
	get prizeStarCount() {
		return this.payload.prize_star_count;
	}
}
