import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

import type { Bot } from "gramio";
import { applyMixins, memoizeGetters } from "#utils";
import { type Constructor } from "#utils";
import { Message } from "../structures";

import { Context } from "./context";
import { MessageContext } from "./message";
import {
	ChatActionMixin,
	ChatControlMixin,
	ChatInviteControlMixin,
	ChatMemberControlMixin,
	ChatSenderControlMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface PinnedMessageContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class PinnedMessageContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: PinnedMessageContextOptions) {
		super({
			bot: options.bot,
			updateType: "pinned_message",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Pinned message */
	get eventMessage() {
		return new MessageContext({
			bot: this.bot,
			payload: this.payload.pinned_message as TelegramObjects.TelegramMessage,
		});
	}
}

interface PinnedMessageContext
	extends Constructor<PinnedMessageContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		ChatInviteControlMixin,
		ChatControlMixin,
		ChatSenderControlMixin,
		ChatMemberControlMixin,
		PinsMixin,
		CloneMixin<PinnedMessageContext, PinnedMessageContextOptions> {}
applyMixins(PinnedMessageContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ChatInviteControlMixin,
	ChatControlMixin,
	ChatSenderControlMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(PinnedMessageContext, ["eventMessage"]);

inspectable(PinnedMessageContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventMessage: context.eventMessage,
		};
	},
});

export { PinnedMessageContext };
