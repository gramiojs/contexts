import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { Message } from "../structures";
import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface WebAppDataContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class WebAppDataContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: WebAppDataContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "web_app_data",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** The data. Be aware that a bad client can send arbitrary data in this field. */
	get data() {
		const webAppData = this.payload
			.web_app_data as TelegramObjects.TelegramWebAppData;

		return webAppData.data;
	}

	/**
	 * Text of the `web_app` keyboard button, from which the Web App was opened.
	 * Be aware that a bad client can send arbitrary data in this field.
	 */
	get buttonText() {
		const webAppData = this.payload
			.web_app_data as TelegramObjects.TelegramWebAppData;

		return webAppData.button_text;
	}
}

interface WebAppDataContext<Bot extends BotLike>
	extends Constructor<WebAppDataContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		CloneMixin<Bot, WebAppDataContext<Bot>, WebAppDataContextOptions<Bot>> {}
applyMixins(WebAppDataContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	CloneMixin,
]);

inspectable(WebAppDataContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			data: context.data,
			buttonText: context.buttonText,
		};
	},
});

export { WebAppDataContext };
