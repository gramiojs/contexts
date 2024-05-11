import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a phone contact. */
@Inspectable()
export class Contact {
	constructor(public payload: TelegramObjects.TelegramContact) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Contact's phone number */
	@Inspect()
	get phoneNumber() {
		return this.payload.phone_number;
	}

	/** Contact's first name */
	@Inspect()
	get firstName() {
		return this.payload.first_name;
	}

	/** Contact's last name */
	@Inspect({ nullable: false })
	get lastName() {
		return this.payload.last_name;
	}

	/** Contact's user identifier in Telegram */
	@Inspect({ nullable: false })
	get userId() {
		return this.payload.user_id;
	}

	/** Additional data about the contact in the form of a vCard */
	@Inspect({ nullable: false })
	get vCard() {
		return this.payload.vcard;
	}
}
