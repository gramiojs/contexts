import { TelegramObjects } from "@gramio/types";
import { Message } from "../structures";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import { type Constructor } from "#utils";

import { inspectable } from "inspectable";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface ChatSharedContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object contains information about the chat whose identifier was shared with the bot using a `KeyboardButtonRequestChat` button. */
class ChatSharedContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramChatShared;

	constructor(options: ChatSharedContextOptions) {
		super({
			bot: options.bot,
			updateType: "chat_shared",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload.chat_shared as TelegramObjects.TelegramChatShared;
	}

	/** Identifier of the request */
	get requestId() {
		return this.event.request_id;
	}

	/** Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
	get sharedChatId() {
		return this.event.chat_id;
	}
}

interface ChatSharedContext
	extends Constructor<ChatSharedContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		PinsMixin,
		CloneMixin<ChatSharedContext, ChatSharedContextOptions> {}
applyMixins(ChatSharedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(ChatSharedContext, {
	serialize(context) {
		return {
			requestId: context.requestId,
			sharedChatId: context.sharedChatId,
		};
	},
});

export { ChatSharedContext };
