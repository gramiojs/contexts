import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { ShippingAddress } from "./shipping-address";

/** This object represents information about an order. */
@Inspectable()
export class OrderInfo {
	constructor(public payload: TelegramObjects.TelegramOrderInfo) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** User name */
	@Inspect({ nullable: false })
	get name() {
		return this.payload.name;
	}

	/** User's phone number */
	@Inspect({ nullable: false })
	get phoneNumber() {
		return this.payload.phone_number;
	}

	/** User email */
	@Inspect({ nullable: false })
	get email() {
		return this.payload.email;
	}

	/** User shipping address */
	@Inspect({ nullable: false })
	get shippingAddress() {
		const { shipping_address } = this.payload;

		if (!shipping_address) return undefined;

		return new ShippingAddress(shipping_address);
	}
}

memoizeGetters(OrderInfo, ["shippingAddress"]);
