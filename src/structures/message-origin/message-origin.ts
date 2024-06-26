import type { TelegramObjects } from "@gramio/types";

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
	constructor(public payload: TelegramObjects.TelegramMessageOrigin) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Is this message origin a certain one?  */
	is<T extends TelegramObjects.TelegramMessageOrigin["type"]>(
		type: T,
	): this is MessageOriginMapping[T] {
		return this.payload.type === type;
	}
}
