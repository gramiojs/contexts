import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { Chat } from "./chat";

/** Information about a message draft whose generation was stopped by the user. */
@Inspectable()
export class MessageGenerationStopped {
	constructor(
		public payload: TelegramObjects.TelegramMessageGenerationStopped,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Chat in which the message was being generated. */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** Unique identifier of the chat. */
	@Inspect()
	get chatId() {
		return this.payload.chat.id;
	}

	/** Type of the chat. */
	@Inspect()
	get chatType() {
		return this.payload.chat.type;
	}

	/** Unique identifier of the message thread, if the draft belongs to one. */
	@Inspect({ nullable: false })
	get threadId() {
		return this.payload.message_thread_id;
	}

	/** Unique identifier of the message draft which was stopped. */
	@Inspect()
	get draftId() {
		return this.payload.draft_id;
	}
}

memoizeGetters(MessageGenerationStopped, ["chat"]);
