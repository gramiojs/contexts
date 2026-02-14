import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import { inspectable } from "inspectable";
import { SuggestedPostApproved } from "../structures/suggested-post-approved";
import { SuggestedPostPrice } from "../structures/suggested-post-price";
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

interface SuggestedPostApprovedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about the approval of a suggested post. */
class SuggestedPostApprovedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramSuggestedPostApproved;

	constructor(options: SuggestedPostApprovedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "suggested_post_approved",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.suggested_post_approved as TelegramObjects.TelegramSuggestedPostApproved;
	}

	/** *Optional*. Amount paid for the post */
	get price() {
		const { price } = this.event;

		if (!price) return undefined;

		return new SuggestedPostPrice(price);
	}

	/** Date when the post will be published */
	get sendDate() {
		return this.event.send_date;
	}
}

interface SuggestedPostApprovedContext<Bot extends BotLike>
	extends Constructor<SuggestedPostApprovedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			SuggestedPostApprovedContext<Bot>,
			SuggestedPostApprovedContextOptions<Bot>
		> {}
applyMixins(SuggestedPostApprovedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

memoizeGetters(SuggestedPostApprovedContext, ["price"]);

inspectable(SuggestedPostApprovedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			price: context.price,
			sendDate: context.sendDate,
		};
	},
});

export { SuggestedPostApprovedContext };
