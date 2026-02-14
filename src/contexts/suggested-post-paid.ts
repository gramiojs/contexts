import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import { inspectable } from "inspectable";
import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface SuggestedPostPaidContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a successful payment for a suggested post. */
class SuggestedPostPaidContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramSuggestedPostPaid;

	constructor(options: SuggestedPostPaidContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "suggested_post_paid",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.suggested_post_paid as TelegramObjects.TelegramSuggestedPostPaid;
	}

	/** Currency in which the payment was made */
	get currency() {
		return this.event.currency;
	}

	/** *Optional*. The amount of the currency that was received by the channel in nanotoncoins; for payments in toncoins only */
	get amount() {
		return this.event.amount;
	}

	/** *Optional*. The amount of Telegram Stars that was received by the channel; for payments in Telegram Stars only */
	get starAmount() {
		return this.event.star_amount;
	}
}

interface SuggestedPostPaidContext<Bot extends BotLike>
	extends Constructor<SuggestedPostPaidContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			SuggestedPostPaidContext<Bot>,
			SuggestedPostPaidContextOptions<Bot>
		> {}
applyMixins(SuggestedPostPaidContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(SuggestedPostPaidContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			currency: context.currency,
			amount: context.amount,
			starAmount: context.starAmount,
		};
	},
});

export { SuggestedPostPaidContext };
