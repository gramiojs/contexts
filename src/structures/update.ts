import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { CallbackQuery } from "./callback-query";

import { memoizeGetters } from "../utils";
import { ChatBoostRemoved } from "./chat-boost-removed";
import { ChatBoostUpdated } from "./chat-boost-updated";
import { ChatJoinRequest } from "./chat-join-request";
import { ChatMemberUpdated } from "./chat-member-updated";
import { ChosenInlineResult } from "./chosen-inline-result";
import { InlineQuery } from "./inline-query";
import { Message } from "./message";
import { MessageReactionCountUpdated } from "./message-reaction-count-updated";
import { MessageReactionUpdated } from "./message-reaction-updated";
import { Poll } from "./poll";
import { PollAnswer } from "./poll-answer";
import { PreCheckoutQuery } from "./pre-checkout-query";
import { ShippingQuery } from "./shipping-query";

/**
 * This object represents an incoming update.
 *
 * At most **one** of the optional parameters can be present in any given
 * update.
 */
@Inspectable()
export class Update {
	constructor(public payload: TelegramObjects.TelegramUpdate) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * The update's unique identifier.
	 * Update identifiers start from a certain positive number and increase
	 * sequentially. This ID becomes especially handy if you're using
	 * **Webhooks**, since it allows you to ignore repeated updates or to restore
	 * the correct update sequence, should they get out of order. If there are no
	 * new updates for at least a week, then identifier of the next update will
	 * be chosen randomly instead of sequentially.
	 */
	@Inspect()
	get id() {
		return this.payload.update_id;
	}

	/**
	 * New incoming message of any kind — text, photo, sticker, etc.
	 */
	@Inspect({ nullable: false })
	get message() {
		const { message } = this.payload;

		if (!message) return undefined;

		return new Message(message);
	}

	/** New version of a message that is known to the bot and was edited */
	@Inspect({ nullable: false })
	get editedMessage() {
		const { edited_message } = this.payload;

		if (!edited_message) return undefined;

		return new Message(edited_message);
	}

	/** New incoming channel post of any kind — text, photo, sticker, etc. */
	@Inspect({ nullable: false })
	get channelPost() {
		const { channel_post } = this.payload;

		if (!channel_post) return undefined;

		return new Message(channel_post);
	}

	/** New version of a channel post that is known to the bot and was edited */
	@Inspect({ nullable: false })
	get editedChannelPost() {
		const { edited_channel_post } = this.payload;

		if (!edited_channel_post) return undefined;

		return new Message(edited_channel_post);
	}

	/** A reaction to a message was changed by a user. The bot must be an administrator in the chat and must explicitly specify `message_reaction` in the list of allowed_updates to receive these updates. The update isn't received for reactions set by bots. */
	@Inspect({ nullable: false })
	get messageReaction() {
		const { message_reaction } = this.payload;

		if (!message_reaction) return undefined;

		return new MessageReactionUpdated(message_reaction);
	}

	/** Reactions to a message with anonymous reactions were changed. The bot must be an administrator in the chat and must explicitly specify `message_reaction_count` in the list of allowed_updates to receive these updates. */
	@Inspect({ nullable: false })
	get messageReactionCount() {
		const { message_reaction_count } = this.payload;

		if (!message_reaction_count) return undefined;

		return new MessageReactionCountUpdated(message_reaction_count);
	}

	/** New incoming inline query */
	@Inspect({ nullable: false })
	get inlineQuery() {
		const { inline_query } = this.payload;

		if (!inline_query) return undefined;

		return new InlineQuery(inline_query);
	}

	/**
	 * The result of an inline query that was chosen by a user and sent to their
	 * chat partner. Please see our documentation on the feedback collecting for
	 * details on how to enable these updates for your bot.
	 */
	@Inspect({ nullable: false })
	get chosenInlineResult() {
		const { chosen_inline_result } = this.payload;

		if (!chosen_inline_result) return undefined;

		return new ChosenInlineResult(chosen_inline_result);
	}

	/** New incoming callback query */
	@Inspect({ nullable: false })
	get callbackQuery() {
		const { callback_query } = this.payload;

		if (!callback_query) return undefined;

		return new CallbackQuery(callback_query);
	}

	/** New incoming shipping query. Only for invoices with flexible price */
	@Inspect({ nullable: false })
	get shippingQuery() {
		const { shipping_query } = this.payload;

		if (!shipping_query) return undefined;

		return new ShippingQuery(shipping_query);
	}

	/**
	 * New incoming pre-checkout query. Contains full information about checkout
	 */
	@Inspect({ nullable: false })
	get preCheckoutQuery() {
		const { pre_checkout_query } = this.payload;

		if (!pre_checkout_query) return undefined;

		return new PreCheckoutQuery(pre_checkout_query);
	}

	/**
	 * New poll state. Bots receive only updates about stopped polls and polls,
	 * which are sent by the bot
	 */
	@Inspect({ nullable: false })
	get poll() {
		const { poll } = this.payload;

		if (!poll) return undefined;

		return new Poll(poll);
	}

	/**
	 * A user changed their answer in a non-anonymous poll. Bots receive new
	 * votes only in polls that were sent by the bot itself.
	 */
	@Inspect({ nullable: false })
	get pollAnswer() {
		const { poll_answer } = this.payload;

		if (!poll_answer) return undefined;

		return new PollAnswer(poll_answer);
	}

	/** The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user. */
	@Inspect({ nullable: false })
	get myChatMember() {
		const { my_chat_member } = this.payload;

		if (!my_chat_member) return undefined;

		return new ChatMemberUpdated(my_chat_member);
	}

	/**
	 * A chat member's status was updated in a chat.
	 *
	 * The bot must be an administrator in the chat and must explicitly specify `chat_member` in the list of `allowed_updates` to receive these updates.
	 */
	@Inspect({ nullable: false })
	get chatMember() {
		const { chat_member } = this.payload;

		if (!chat_member) return undefined;

		return new ChatMemberUpdated(chat_member);
	}

	/** A request to join the chat has been sent. The bot must have the `can_invite_users` administrator right in the chat to receive these updates. */
	@Inspect({ nullable: false })
	get chatJoinRequest() {
		const { chat_join_request } = this.payload;

		if (!chat_join_request) return undefined;

		return new ChatJoinRequest(chat_join_request);
	}

	/** A chat boost was added or changed. The bot must be an administrator in the chat to receive these updates. */
	@Inspect()
	get chatBoost() {
		const { chat_boost } = this.payload;

		if (!chat_boost) return undefined;

		return new ChatBoostUpdated(chat_boost);
	}

	/** A boost was removed from a chat. The bot must be an administrator in the chat to receive these updates. */
	@Inspect()
	get removedChatBoost() {
		const { removed_chat_boost } = this.payload;

		if (!removed_chat_boost) return undefined;

		return new ChatBoostRemoved(removed_chat_boost);
	}
}

memoizeGetters(Update, [
	"message",
	"editedMessage",
	"channelPost",
	"editedChannelPost",
	"messageReaction",
	"messageReactionCount",
	"inlineQuery",
	"chosenInlineResult",
	"callbackQuery",
	"shippingQuery",
	"preCheckoutQuery",
	"poll",
	"pollAnswer",
	"chatMember",
	"myChatMember",
	"chatJoinRequest",
	"chatBoost",
	"removedChatBoost",
]);
