import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

import { memoizeGetters } from "#utils";
import { ShippingAddress } from "./shipping-address";
import { User } from "./user";

/** This object contains information about an incoming shipping query. */
@Inspectable()
export class ShippingQuery {
	constructor(public payload: Interfaces.TelegramShippingQuery) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique query identifier */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/** User who sent the query */
	@Inspect()
	get from() {
		return new User(this.payload.from);
	}

	/** Sender ID */
	@Inspect()
	get senderId() {
		return this.from.id;
	}

	/** Bot specified invoice payload */
	@Inspect()
	get invoicePayload() {
		return this.payload.invoice_payload;
	}

	/** User specified shipping address */
	@Inspect()
	get shippingAddress() {
		return new ShippingAddress(this.payload.shipping_address);
	}
}

memoizeGetters(ShippingQuery, ["from", "shippingAddress"]);
