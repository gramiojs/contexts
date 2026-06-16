import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * Represents an HTTP link.
 *
 * [Documentation](https://core.telegram.org/bots/api/#link)
 */
@Inspectable()
export class Link {
	constructor(public payload: TelegramObjects.TelegramLink) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** URL of the link */
	@Inspect()
	get url() {
		return this.payload.url;
	}
}
