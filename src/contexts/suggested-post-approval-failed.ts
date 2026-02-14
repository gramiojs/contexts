import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import { inspectable } from "inspectable";
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

interface SuggestedPostApprovalFailedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about the failed approval of a suggested post. */
class SuggestedPostApprovalFailedContext<
	Bot extends BotLike,
> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramSuggestedPostApprovalFailed;

	constructor(options: SuggestedPostApprovalFailedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "suggested_post_approval_failed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.suggested_post_approval_failed as TelegramObjects.TelegramSuggestedPostApprovalFailed;
	}

	/** Expected price of the post */
	get price() {
		return new SuggestedPostPrice(this.event.price);
	}
}

interface SuggestedPostApprovalFailedContext<Bot extends BotLike>
	extends Constructor<SuggestedPostApprovalFailedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			SuggestedPostApprovalFailedContext<Bot>,
			SuggestedPostApprovalFailedContextOptions<Bot>
		> {}
applyMixins(SuggestedPostApprovalFailedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

memoizeGetters(SuggestedPostApprovalFailedContext, ["price"]);

inspectable(SuggestedPostApprovalFailedContext, {
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
		};
	},
});

export { SuggestedPostApprovalFailedContext };
