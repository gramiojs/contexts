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

interface SuggestedPostRefundedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a payment refund for a suggested post. */
class SuggestedPostRefundedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramSuggestedPostRefunded;

	constructor(options: SuggestedPostRefundedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "suggested_post_refunded",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.suggested_post_refunded as TelegramObjects.TelegramSuggestedPostRefunded;
	}

	/** Reason for the refund */
	get reason() {
		return this.event.reason;
	}
}

interface SuggestedPostRefundedContext<Bot extends BotLike>
	extends Constructor<SuggestedPostRefundedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			SuggestedPostRefundedContext<Bot>,
			SuggestedPostRefundedContextOptions<Bot>
		> {}
applyMixins(SuggestedPostRefundedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(SuggestedPostRefundedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			reason: context.reason,
		};
	},
});

export { SuggestedPostRefundedContext };
