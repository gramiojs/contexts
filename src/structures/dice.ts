import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";
import * as Params from "@gramio/types/params";

/** This object represents an animated emoji that displays a random value. */
@Inspectable()
export class Dice {
	constructor(public payload: Interfaces.TelegramDice) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Emoji on which the dice throw animation is based */
	@Inspect()
	get emoji() {
		return this.payload.emoji as NonNullable<Params.SendDiceParams["emoji"]>;
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
