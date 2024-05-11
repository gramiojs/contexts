import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { PhotoSize } from "./photo-size";

/** This object contains information about the chat whose identifier was shared with the bot using a KeyboardButtonRequestChat button. */
@Inspectable()
export class ChatShared {
	constructor(public payload: TelegramObjects.TelegramChatShared) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Identifier of the request */
	@Inspect()
	get requestId() {
		return this.payload.request_id;
	}

	/** Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
	@Inspect()
	get chatId() {
		return this.payload.chat_id;
	}

	/** Title of the chat, if the title was requested by the bot. */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/** Username of the chat, if the username was requested by the bot and available. */
	@Inspect()
	get username() {
		return this.payload.username;
	}

	/** Available sizes of the chat photo, if the photo was requested by the bot. */
	@Inspect()
	get photo() {
		return this.payload.photo?.map((size) => new PhotoSize(size));
	}
}
