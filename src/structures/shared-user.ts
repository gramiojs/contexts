import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { PhotoSize } from "./photo-size";

/** This object contains information about the user whose identifier was shared with the bot using a `KeyboardButtonRequestUser` button. */
@Inspectable()
export class SharedUser {
	constructor(public payload: TelegramObjects.TelegramSharedUser) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so 64-bit integers or double-precision float types are safe for storing these identifiers. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
	@Inspect()
	get userId() {
		return this.payload.user_id;
	}

	/** First name of the user, if the name was requested by the bot */
	@Inspect()
	get firstName() {
		return this.payload.first_name;
	}

	/** Last name of the user, if the name was requested by the bot */
	@Inspect()
	get lastName() {
		return this.payload.last_name;
	}

	/** Username of the user, if the username was requested by the bot */
	@Inspect()
	get username() {
		return this.payload.username;
	}

	/** Available sizes of the chat photo, if the photo was requested by the bot */
	@Inspect()
	get photo() {
		return this.payload.photo?.map((photo) => new PhotoSize(photo));
	}
}
