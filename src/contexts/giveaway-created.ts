import { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
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

interface GiveawayCreatedContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about the creation of a scheduled giveaway. Currently holds no information. */
class GiveawayCreatedContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: GiveawayCreatedContextOptions) {
		super({
			bot: options.bot,
			updateType: "giveaway_created",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface GiveawayCreatedContext
	extends Constructor<GiveawayCreatedContext>,
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
		CloneMixin<GiveawayCreatedContext, GiveawayCreatedContextOptions> {}
applyMixins(GiveawayCreatedContext, [
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

export { GiveawayCreatedContext };

inspectable(GiveawayCreatedContext, {
	serialize(context: GiveawayCreatedContext) {
		return {
			id: context.id,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
		};
	},
});
