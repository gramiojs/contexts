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

interface SuggestedPostDeclinedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about the rejection of a suggested post. */
class SuggestedPostDeclinedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramSuggestedPostDeclined;

	constructor(options: SuggestedPostDeclinedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "suggested_post_declined",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.suggested_post_declined as TelegramObjects.TelegramSuggestedPostDeclined;
	}

	/** *Optional*. Comment with which the post was declined */
	get comment() {
		return this.event.comment;
	}
}

interface SuggestedPostDeclinedContext<Bot extends BotLike>
	extends Constructor<SuggestedPostDeclinedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			SuggestedPostDeclinedContext<Bot>,
			SuggestedPostDeclinedContextOptions<Bot>
		> {}
applyMixins(SuggestedPostDeclinedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(SuggestedPostDeclinedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			comment: context.comment,
		};
	},
});

export { SuggestedPostDeclinedContext };
