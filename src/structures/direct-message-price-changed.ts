import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * Describes a service message about a change in the price of direct messages sent to a channel chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#directmessagepricechanged)
 */
@Inspectable()
export class DirectMessagePriceChanged {
	constructor(
		public payload: TelegramObjects.TelegramDirectMessagePriceChanged,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *True*, if direct messages are enabled for the channel chat; false otherwise
	 */
	@Inspect()
	get areDirectMessagesEnabled() {
		return this.payload.are_direct_messages_enabled;
	}

	/**
	 * *Optional*. The new number of Telegram Stars that must be paid by users for each direct message sent to the channel. Does not apply to users who have been exempted by administrators. Defaults to 0.
	 */
	@Inspect()
	get directMessageStarCount() {
		return this.payload.direct_message_star_count;
	}
}
