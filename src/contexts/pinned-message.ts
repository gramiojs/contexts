import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { Message } from "../structures/index";
import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import type { BotLike } from "../types";
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
} from "./mixins/index";

interface PinnedMessageContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** Specified message was pinned. Note that the Message object in this field will not contain further *reply\_to\_message* fields even if it itself is a reply. */
class PinnedMessageContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	constructor(options: PinnedMessageContextOptions<Bot>) {
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

interface PinnedMessageContext<Bot extends BotLike>
	extends Constructor<PinnedMessageContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		ChatControlMixin<Bot>,
		ChatSenderControlMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			PinnedMessageContext<Bot>,
			PinnedMessageContextOptions<Bot>
		> {}
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
