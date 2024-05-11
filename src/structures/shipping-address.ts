import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a shipping address. */
@Inspectable()
export class ShippingAddress {
	constructor(public payload: TelegramObjects.TelegramShippingAddress) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** ISO 3166-1 alpha-2 country code */
	@Inspect()
	get countryCode() {
		return this.payload.country_code;
	}

	/** State, if applicable */
	@Inspect()
	get state() {
		return this.payload.state;
	}

	/** City */
	@Inspect()
	get city() {
		return this.payload.city;
	}

	/** First line for the address */
	@Inspect()
	get firstStreetLine() {
		return this.payload.street_line1;
	}

	/** Second line for the address */
	@Inspect()
	get secondStreetLine() {
		return this.payload.street_line2;
	}

	/** Address post code */
	@Inspect()
	get postCode() {
		return this.payload.post_code;
	}
}
