import { inspectable } from "inspectable";
import { Message, PassportData } from "../structures";

import * as Interfaces from "@gramio/types/objects";

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

interface PassportDataContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

class PassportDataContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: PassportDataContextOptions) {
		super({
			bot: options.bot,
			updateType: "passport_data",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Telegram Passport data */
	get passportData() {
		return new PassportData(
			this.payload.passport_data as Interfaces.TelegramPassportData,
		);
	}
}

interface PassportDataContext
	extends Constructor<PassportDataContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		PinsMixin,
		CloneMixin<PassportDataContext, PassportDataContextOptions> {}
applyMixins(PassportDataContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(PassportDataContext, ["passportData"]);

inspectable(PassportDataContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			passportData: context.passportData,
		};
	},
});

export { PassportDataContext };
