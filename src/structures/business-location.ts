import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Location } from "./location";

/**
 * [Documentation](https://core.telegram.org/bots/api/#businesslocation)
 */
@Inspectable()
export class BusinessLocation {
	constructor(public payload: TelegramObjects.TelegramBusinessLocation) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Address of the business */
	@Inspect()
	get address() {
		return this.payload.address;
	}

	/** Location of the business */
	@Inspect()
	get location() {
		return this.payload.location
			? new Location(this.payload.location)
			: undefined;
	}
}
