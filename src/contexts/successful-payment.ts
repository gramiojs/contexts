import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { Message, SuccessfulPayment } from "../structures";

import type { Bot } from "gramio";
import { applyMixins, memoizeGetters } from "#utils";
import { type Constructor } from "#utils";

import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface SuccessfulPaymentContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class SuccessfulPaymentContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: SuccessfulPaymentContextOptions) {
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

interface SuccessfulPaymentContext
	extends Constructor<SuccessfulPaymentContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		PinsMixin,
		CloneMixin<SuccessfulPaymentContext, SuccessfulPaymentContextOptions> {}
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
