import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { Message, MessageAutoDeleteTimerChanged } from "../structures";

import { type Constructor } from "#types";
import { applyMixins, memoizeGetters } from "#utils";

import { BotLike } from "#types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface MessageAutoDeleteTimerChangedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class MessageAutoDeleteTimerChangedContext<
	Bot extends BotLike,
> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: MessageAutoDeleteTimerChangedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "message_auto_delete_timer_changed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Message auto delete timer */
	get autoDeleteTimer() {
		return new MessageAutoDeleteTimerChanged(
			this.payload
				.message_auto_delete_timer_changed as TelegramObjects.TelegramMessageAutoDeleteTimerChanged,
		);
	}
}

interface MessageAutoDeleteTimerChangedContext<Bot extends BotLike>
	extends Constructor<MessageAutoDeleteTimerChangedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			MessageAutoDeleteTimerChangedContext<Bot>,
			MessageAutoDeleteTimerChangedContextOptions<Bot>
		> {}
applyMixins(MessageAutoDeleteTimerChangedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(MessageAutoDeleteTimerChangedContext, ["autoDeleteTimer"]);

inspectable(MessageAutoDeleteTimerChangedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			autoDeleteTimer: context.autoDeleteTimer,
		};
	},
});

export { MessageAutoDeleteTimerChangedContext };
