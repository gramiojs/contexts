import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { Message } from "../structures/index";
import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatInviteControlMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface MigrateFromChatIdContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
class MigrateFromChatIdContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	constructor(options: MigrateFromChatIdContextOptions<Bot>) {
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

interface MigrateFromChatIdContext<Bot extends BotLike>
	extends Constructor<MigrateFromChatIdContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		CloneMixin<
			Bot,
			MigrateFromChatIdContext<Bot>,
			MigrateFromChatIdContextOptions<Bot>
		> {}
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
