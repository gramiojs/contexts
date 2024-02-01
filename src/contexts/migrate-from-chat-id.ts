import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

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

interface MigrateFromChatIdContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

class MigrateFromChatIdContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: MigrateFromChatIdContextOptions) {
		super({
			bot: options.bot,
			updateType: "migrate_from_chat_id",
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

interface MigrateFromChatIdContext
	extends Constructor<MigrateFromChatIdContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		PinsMixin,
		ChatInviteControlMixin,
		CloneMixin<MigrateFromChatIdContext, MigrateFromChatIdContextOptions> {}
applyMixins(MigrateFromChatIdContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	ChatInviteControlMixin,
	CloneMixin,
]);

inspectable(MigrateFromChatIdContext, {
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

export { MigrateFromChatIdContext };
