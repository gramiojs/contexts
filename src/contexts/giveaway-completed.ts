import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";

import { Message } from "../structures/message";
import type { BotLike } from "../types";
import type { Constructor } from "../types";
import { applyMixins, filterPayload } from "../utils";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatControlMixin,
	ChatInviteControlMixin,
	ChatMemberControlMixin,
	ChatSenderControlMixin,
	CloneMixin,
	ForumMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface GiveawayCompletedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about the creation of a scheduled giveaway. Currently holds no information. */
class GiveawayCompletedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	constructor(options: GiveawayCompletedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "giveaway_completed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Giveaway completed */
	get eventGiveaway() {
		return this.giveawayCompleted!;
	}
}

interface GiveawayCompletedContext<Bot extends BotLike>
	extends Constructor<GiveawayCompletedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ForumMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		ChatControlMixin<Bot>,
		ChatSenderControlMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			GiveawayCompletedContext<Bot>,
			GiveawayCompletedContextOptions<Bot>
		> {}
applyMixins(GiveawayCompletedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ForumMixin,
	ChatInviteControlMixin,
	ChatControlMixin,
	ChatSenderControlMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);

export { GiveawayCompletedContext };

inspectable(GiveawayCompletedContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: GiveawayCompletedContext<any>) {
		const payload = {
			id: context.id,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventGiveaway: context.eventGiveaway,
		};

		return filterPayload(payload);
	},
});
