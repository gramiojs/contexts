import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * This object represents a file uploaded to Telegram Passport.
 * Currently all Telegram Passport files are in JPEG format when decrypted and
 * don't exceed 10MB.
 */
@Inspectable()
export class PassportFile {
	constructor(public payload: TelegramObjects.TelegramPassportFile) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Identifier for this file, which can be used to download or reuse the file
	 */
	@Inspect()
	get fileId() {
		return this.payload.file_id;
	}

	/**
	 * Unique identifier for this file, which is supposed to be the same over
	 * time and for different bots. Can't be used to download or reuse the file.
	 */
	@Inspect()
	get fileUniqueId() {
		return this.payload.file_unique_id;
	}

	/** File size */
	@Inspect()
	get fileSize() {
		return this.payload.file_size;
	}

	/** Unix time when the file was uploaded */
	@Inspect()
	get fileDate() {
		return this.payload.file_date;
	}
}
