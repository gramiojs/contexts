import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { EncryptedCredentials } from "./encrypted-credentials";
import { EncryptedPassportElement } from "./encrypted-passport-element";

/**
 * Contains information about Telegram Passport data shared with the bot by the
 * user.
 */
@Inspectable()
export class PassportData {
	constructor(public payload: TelegramObjects.TelegramPassportData) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
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
