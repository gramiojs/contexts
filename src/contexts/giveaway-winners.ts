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

interface GiveawayWinnersContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a message about the completion of a giveaway with public winners. */
class GiveawayWinnersContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: GiveawayWinnersContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "giveaway_winners",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Giveaway winners */
	get eventGiveaway() {
		return this.giveawayWinners!;
	}
}

interface GiveawayWinnersContext<Bot extends BotLike>
	extends Constructor<GiveawayWinnersContext<Bot>>,
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
			GiveawayWinnersContext<Bot>,
			GiveawayWinnersContextOptions<Bot>
		> {}
applyMixins(GiveawayWinnersContext, [
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

export { GiveawayWinnersContext };

inspectable(GiveawayWinnersContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: GiveawayWinnersContext<any>) {
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
