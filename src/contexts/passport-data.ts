import { inspectable } from "inspectable";
import { Message, PassportData } from "../structures/index";

import type { TelegramObjects } from "@gramio/types";

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
} from "./mixins/index";

interface PassportDataContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/**
 * Describes Telegram Passport data shared with the bot by the user.
 *
 * [Documentation](https://core.telegram.org/bots/api/#passportdata)
 */
class PassportDataContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	constructor(options: PassportDataContextOptions<Bot>) {
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
			this.payload.passport_data as TelegramObjects.TelegramPassportData,
		);
	}
}

interface PassportDataContext<Bot extends BotLike>
	extends Constructor<PassportDataContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			PassportDataContext<Bot>,
			PassportDataContextOptions<Bot>
		> {}
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
