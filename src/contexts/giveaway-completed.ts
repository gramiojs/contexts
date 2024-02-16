import { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";

import type { Bot } from "gramio";
import { applyMixins, filterPayload } from "#utils";
import { type Constructor } from "#utils";
import { Message } from "../structures/message";
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
} from "./mixins";

interface GiveawayCompletedContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about the creation of a scheduled giveaway. Currently holds no information. */
class GiveawayCompletedContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: GiveawayCompletedContextOptions) {
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

interface GiveawayCompletedContext
	extends Constructor<GiveawayCompletedContext>,
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
		CloneMixin<GiveawayCompletedContext, GiveawayCompletedContextOptions> {}
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
	serialize(context: GiveawayCompletedContext) {
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
