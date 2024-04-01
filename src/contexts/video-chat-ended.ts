import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Message, VideoChatEnded } from "../structures";

import type { Constructor } from "#types";
import { applyMixins, memoizeGetters } from "#utils";

import type { BotLike } from "#types";
import { Context } from "./context";
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

interface VideoChatEndedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class VideoChatEndedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: VideoChatEndedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "video_chat_ended",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Service message: video chat ended */
	get eventEnded() {
		return new VideoChatEnded(
			this.payload.video_chat_ended as TelegramObjects.TelegramVideoChatEnded,
		);
	}
}

interface VideoChatEndedContext<Bot extends BotLike>
	extends Constructor<VideoChatEndedContext<Bot>>,
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
			VideoChatEndedContext<Bot>,
			VideoChatEndedContextOptions<Bot>
		> {}
applyMixins(VideoChatEndedContext, [
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
memoizeGetters(VideoChatEndedContext, ["eventEnded"]);

inspectable(VideoChatEndedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventEnded: context.eventEnded,
		};
	},
});

export { VideoChatEndedContext };
