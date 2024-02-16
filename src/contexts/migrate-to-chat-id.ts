import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";
import { Message } from "../structures";

import { Context } from "./context";
import {
	ChatActionMixin,
	ChatInviteControlMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface MigrateToChatIdContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class MigrateToChatIdContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: MigrateToChatIdContextOptions) {
		super({
			bot: options.bot,
			updateType: "migrate_to_chat_id",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Chat ID */
	get eventId() {
		return this.payload.migrate_to_chat_id as number;
	}
}

interface MigrateToChatIdContext
	extends Constructor<MigrateToChatIdContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		PinsMixin,
		ChatInviteControlMixin,
		CloneMixin<MigrateToChatIdContext, MigrateToChatIdContextOptions> {}
applyMixins(MigrateToChatIdContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	ChatInviteControlMixin,
	CloneMixin,
]);

inspectable(MigrateToChatIdContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventId: context.eventId,
		};
	},
});

export { MigrateToChatIdContext };
