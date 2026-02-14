import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * This object describes the rating of a user based on their Telegram Star spendings.
 *
 * [Documentation](https://core.telegram.org/bots/api/#userrating)
 */
@Inspectable()
export class UserRating {
	constructor(public payload: TelegramObjects.TelegramUserRating) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Current level of the user, indicating their reliability when purchasing digital goods and services
	 */
	@Inspect()
	get level() {
		return this.payload.level;
	}

	/**
	 * Numerical value of the user's rating; the higher the rating, the better
	 */
	@Inspect()
	get rating() {
		return this.payload.rating;
	}

	/**
	 * The rating value required to get the current level
	 */
	@Inspect()
	get currentLevelRating() {
		return this.payload.current_level_rating;
	}

	/**
	 * *Optional*. The rating value required to get to the next level; omitted if the maximum level was reached
	 */
	@Inspect({ nullable: false })
	get nextLevelRating() {
		return this.payload.next_level_rating;
	}
}
