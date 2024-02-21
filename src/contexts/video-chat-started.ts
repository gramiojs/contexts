import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { Message, VideoChatStarted } from "../structures";

import { type Constructor } from "#types";
import { applyMixins, memoizeGetters } from "#utils";

import { BotLike } from "#types";
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

interface VideoChatStartedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class VideoChatStartedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: VideoChatStartedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "video_chat_started",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Service message: video chat started */
	get eventStarted() {
		return new VideoChatStarted(
			this.payload
				.video_chat_started as TelegramObjects.TelegramVideoChatStarted,
		);
	}
}

interface VideoChatStartedContext<Bot extends BotLike>
	extends Constructor<VideoChatStartedContext<Bot>>,
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
			VideoChatStartedContext<Bot>,
			VideoChatStartedContextOptions<Bot>
		> {}
applyMixins(VideoChatStartedContext, [
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
memoizeGetters(VideoChatStartedContext, ["eventStarted"]);

inspectable(VideoChatStartedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventStarted: context.eventStarted,
		};
	},
});

export { VideoChatStartedContext };
