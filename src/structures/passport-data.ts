import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

import { memoizeGetters } from "#utils";
import { EncryptedCredentials } from "./encrypted-credentials";
import { EncryptedPassportElement } from "./encrypted-passport-element";

/**
 * Contains information about Telegram Passport data shared with the bot by the
 * user.
 */
@Inspectable()
export class PassportData {
	constructor(public payload: Interfaces.TelegramPassportData) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Array with information about documents and other Telegram Passport
	 * elements that was shared with the bot
	 */
	@Inspect({ nullable: false })
	get data() {
		const { data } = this.payload;

		if (!data) return undefined;

		return data.map((element) => new EncryptedPassportElement(element));
	}

	/** Encrypted credentials required to decrypt the data */
	@Inspect()
	get credentials() {
		return new EncryptedCredentials(this.payload.credentials);
	}
}

memoizeGetters(PassportData, ["credentials"]);
