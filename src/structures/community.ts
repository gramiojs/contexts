import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * This object represents a community — several supergroups, channels, and bots
 * linked together around a shared topic or audience.
 *
 * [Documentation](https://core.telegram.org/bots/api/#community)
 */
@Inspectable()
export class Community {
	constructor(public payload: TelegramObjects.TelegramCommunity) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique identifier for this community */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/** Name of the community */
	@Inspect()
	get name() {
		return this.payload.name;
	}
}
