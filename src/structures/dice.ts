import type { TelegramObjects, TelegramParams } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/** This object represents an animated emoji that displays a random value. */
@Inspectable()
export class Dice {
	constructor(public payload: TelegramObjects.TelegramDice) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Emoji on which the dice throw animation is based */
	@Inspect()
	get emoji() {
		return this.payload.emoji as NonNullable<
			TelegramParams.SendDiceParams["emoji"]
		>;
	}

	/**
	 * Value of the dice,
	 * `1-6` for `🎲`, `🎯` and `🎳` base emoji,
	 * `1-5` for `🏀` and `⚽️` base emoji,
	 * `1-64` for `🎰` base emoji
	 */
	@Inspect()
	get value() {
		return this.payload.value;
	}
}
