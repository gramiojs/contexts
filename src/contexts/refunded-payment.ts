import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import { RefundedPayment } from "../structures/refunded-payment";
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

interface RefundedPaymentContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/**
 * This object contains basic information about a successful payment.
 *
 * [Documentation](https://core.telegram.org/bots/api/#RefundedPayment)
 */
class RefundedPaymentContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	constructor(options: RefundedPaymentContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "refunded_payment",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/**
	 * This object contains basic information about a refunded payment.
	 *
	 * [Documentation](https://core.telegram.org/bots/api/#refundedpayment)
	 */
	get eventRefundedPayment() {
		return new RefundedPayment(
			this.payload.refunded_payment as TelegramObjects.TelegramRefundedPayment,
		);
	}
}

interface RefundedPaymentContext<Bot extends BotLike>
	extends Constructor<RefundedPaymentContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			RefundedPaymentContext<Bot>,
			RefundedPaymentContextOptions<Bot>
		> {}
applyMixins(RefundedPaymentContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(RefundedPaymentContext, ["eventRefundedPayment"]);

inspectable(RefundedPaymentContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventRefundedPayment: context.eventRefundedPayment,
		};
	},
});

export { RefundedPaymentContext };
