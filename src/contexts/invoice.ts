import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { Invoice, Message } from "../structures";

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

interface InvoiceContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class InvoiceContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: InvoiceContextOptions) {
		super({
			bot: options.bot,
			updateType: "invoice",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Invoice */
	get eventInvoice() {
		return new Invoice(this.payload.invoice as TelegramObjects.TelegramInvoice);
	}
}

interface InvoiceContext
	extends Constructor<InvoiceContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		PinsMixin,
		CloneMixin<InvoiceContext, InvoiceContextOptions> {}
applyMixins(InvoiceContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(InvoiceContext, ["eventInvoice"]);

inspectable(InvoiceContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventInvoice: context.eventInvoice,
		};
	},
});

export { InvoiceContext };
