import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Message, SuccessfulPayment } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface SuccessfulPaymentContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class SuccessfulPaymentContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: SuccessfulPaymentContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "successful_payment",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Received payment */
	get eventPayment() {
		return new SuccessfulPayment(
			this.payload
				.successful_payment as TelegramObjects.TelegramSuccessfulPayment,
		);
	}
}

interface SuccessfulPaymentContext<Bot extends BotLike>
	extends Constructor<SuccessfulPaymentContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			SuccessfulPaymentContext<Bot>,
			SuccessfulPaymentContextOptions<Bot>
		> {}
applyMixins(SuccessfulPaymentContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(SuccessfulPaymentContext, ["eventPayment"]);

inspectable(SuccessfulPaymentContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventPayment: context.eventPayment,
		};
	},
});

export { SuccessfulPaymentContext };
