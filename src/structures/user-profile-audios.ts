import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { AudioAttachment } from "./attachments/audio";

/**
 * This object represents the audios displayed on a user's profile.
 *
 * [Documentation](https://core.telegram.org/bots/api/#userprofileaudios)
 */
@Inspectable()
export class UserProfileAudios {
	constructor(public payload: TelegramObjects.TelegramUserProfileAudios) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Total number of profile audios for the target user
	 */
	@Inspect()
	get totalCount() {
		return this.payload.total_count;
	}

	/**
	 * Requested profile audios
	 */
	@Inspect()
	get audios() {
		return this.payload.audios.map((audio) => new AudioAttachment(audio));
	}
}
memoizeGetters(UserProfileAudios, ["audios"]);
