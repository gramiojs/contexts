import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * Contains data required for decrypting and authenticatin
 * `EncryptedPassportElement`. See the Telegram Passport Documentation for a
 * complete description of the data decryption and authentication processes.
 */
@Inspectable()
export class EncryptedCredentials {
	constructor(public payload: TelegramObjects.TelegramEncryptedCredentials) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Base64-encoded encrypted JSON-serialized data with unique user's payload,
	 * data hashes and secrets required for `EncryptedPassportElement` decryption
	 * and authentication
	 */
	@Inspect()
	get data() {
		return this.payload.data;
	}

	/** Base64-encoded data hash for data authentication */
	@Inspect()
	get hash() {
		return this.payload.hash;
	}

	/**
	 * Base64-encoded secret, encrypted with the bot's public RSA key, required
	 * for data decryption
	 */
	@Inspect()
	get secret() {
		return this.payload.secret;
	}
}
