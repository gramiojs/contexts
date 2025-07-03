import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import { inspectable } from "inspectable";
import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatControlMixin,
	ChatInviteControlMixin,
	ChatMemberControlMixin,
	ChatSenderControlMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface DirectMessagePriceChangedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about direct message price changed. */
class DirectMessagePriceChangedContext<
	Bot extends BotLike,
> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	event: TelegramObjects.TelegramDirectMessagePriceChanged;

	constructor(options: DirectMessagePriceChangedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "direct_message_price_changed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = options.payload.direct_message_price_changed!;
	}

	/**
	 * *True*, if direct messages are enabled for the channel chat; false otherwise
	 */
	get areDirectMessagesEnabled() {
		return this.event.are_direct_messages_enabled;
	}

	/**
	 * *Optional*. The new number of Telegram Stars that must be paid by users for each direct message sent to the channel. Does not apply to users who have been exempted by administrators. Defaults to 0.
	 */
	get directMessageStarCount() {
		return this.event.direct_message_star_count;
	}
}

interface DirectMessagePriceChangedContext<Bot extends BotLike>
	extends Constructor<DirectMessagePriceChangedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		ChatControlMixin<Bot>,
		ChatSenderControlMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			DirectMessagePriceChangedContext<Bot>,
			DirectMessagePriceChangedContextOptions<Bot>
		> {}
applyMixins(DirectMessagePriceChangedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ChatInviteControlMixin,
	ChatControlMixin,
	ChatSenderControlMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(DirectMessagePriceChangedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			areDirectMessagesEnabled: context.areDirectMessagesEnabled,
			directMessageStarCount: context.directMessageStarCount,
		};
	},
});

export { DirectMessagePriceChangedContext };
