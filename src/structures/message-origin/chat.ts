import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { Chat } from "../chat";

import { memoizeGetters } from "../../utils";
import { MessageOrigin } from "./message-origin";

/** The message was originally sent on behalf of a chat to a group chat. */
@Inspectable()
export class MessageOriginChat extends MessageOrigin {
	constructor(public payload: TelegramObjects.TelegramMessageOriginChat) {
		super(payload);
	}

	/** Type of the message origin, always `chat` */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/** Date the message was sent originally in Unix time */
	@Inspect()
	get date() {
		return this.payload.date;
	}

	/** Chat that sent the message originally */
	@Inspect()
	get senderChat() {
		return new Chat(this.payload.sender_chat);
	}

	/** For messages originally sent by an anonymous chat administrator, original message author signature */
	@Inspect({ nullable: false })
	get authorSignature() {
		return this.payload.author_signature;
	}
}

memoizeGetters(MessageOriginChat, ["senderChat"]);
