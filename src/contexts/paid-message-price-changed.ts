import type { TelegramObjects } from "@gramio/types";
import { Message, WriteAccessAllowed } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import { Inspect, inspectable } from "inspectable";
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

interface PaidMessagePriceChangedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/**
 * Describes a service message about a change in the price of paid messages within a chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#paidmessagepricechanged)
 */
class PaidMessagePriceChangedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramPaidMessagePriceChanged;

	constructor(options: PaidMessagePriceChangedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "paid_message_price_changed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.paid_message_price_changed as TelegramObjects.TelegramPaidMessagePriceChanged;
	}

	/**
	 * The new number of Telegram Stars that must be paid by non-administrator users of the supergroup chat for each sent message
	 */
	@Inspect()
	get paidMessageStarCount() {
		return this.event.paid_message_star_count;
	}
}

interface PaidMessagePriceChangedContext<Bot extends BotLike>
	extends Constructor<PaidMessagePriceChangedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			PaidMessagePriceChangedContext<Bot>,
			PaidMessagePriceChangedContextOptions<Bot>
		> {}
applyMixins(PaidMessagePriceChangedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

// inspectable(PaidMessagePriceChangedContext, {
// 	serialize(context) {
// 		return {
// 			id: context.id,
// 			createdAt: context.createdAt,
// 			updatedAt: context.updatedAt,
// 			chat: context.chat,
// 			from: context.from,
// 			paidMessageStarCount: context.paidMessageStarCount,
// 		};
// 	},
// });

export { PaidMessagePriceChangedContext };
