import * as Interfaces from "@gramio/types/objects";

import type { MessageOriginChannel } from "./channel";
import type { MessageOriginChat } from "./chat";
import type { MessageOriginHiddenUser } from "./hidden-user";
import type { MessageOriginUser } from "./user";

interface MessageOriginMapping {
	user: MessageOriginUser;
	chat: MessageOriginChat;
	channel: MessageOriginChannel;
	hidden_user: MessageOriginHiddenUser;
}

export class MessageOrigin {
	constructor(public payload: Interfaces.TelegramMessageOrigin) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Is this message origin a certain one?  */
	is<T extends Interfaces.TelegramMessageOrigin["type"]>(
		type: T,
	): this is MessageOriginMapping[T] {
		return this.payload.type === type;
	}
}
