import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "#utils";
import { Location } from "./location";

/**
 * Contains information about the location of a Telegram Business account.
 *
 * [Documentation](https://core.telegram.org/bots/api/#businesslocation)
 */
@Inspectable()
export class BusinessLocation {
	constructor(public payload: TelegramObjects.TelegramBusinessLocation) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Address of the business
	 */
	@Inspect()
	get address() {
		return this.payload.address;
	}

	/**
	 * *Optional*. Location of the business
	 */
	@Inspect()
	get location() {
		return this.payload.location
			? new Location(this.payload.location)
			: undefined;
	}
}
memoizeGetters(BusinessLocation, ["location"]);
