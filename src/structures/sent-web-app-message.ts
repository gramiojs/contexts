import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** Contains information about an inline message sent by a Web App on behalf of a user. */
@Inspectable()
export class SentWebAppMessage {
	constructor(public payload: Interfaces.TelegramSentWebAppMessage) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Identifier of the sent inline message.
	 *
	 * Available only if there is an inline keyboard attached to the message.
	 */
	@Inspect({ nullable: false })
	get inlineMessageId() {
		return this.payload.inline_message_id;
	}
}
