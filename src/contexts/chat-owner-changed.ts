import type { TelegramObjects } from "@gramio/types";
import { ChatOwnerChanged, Message, User } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import { inspectable } from "inspectable";
import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface ChatOwnerChangedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about an ownership change in the chat. */
class ChatOwnerChangedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramChatOwnerChanged;

	constructor(options: ChatOwnerChangedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "chat_owner_changed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.chat_owner_changed as TelegramObjects.TelegramChatOwnerChanged;
	}

	/** Service message: chat owner changed information */
	get chatOwnerChanged() {
		return new ChatOwnerChanged(this.event);
	}

	/** The new owner of the chat */
	get newOwner() {
		return new User(this.event.new_owner);
	}
}

interface ChatOwnerChangedContext<Bot extends BotLike>
	extends Constructor<ChatOwnerChangedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			ChatOwnerChangedContext<Bot>,
			ChatOwnerChangedContextOptions<Bot>
		> {}
applyMixins(ChatOwnerChangedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(ChatOwnerChangedContext, ["chatOwnerChanged", "newOwner"]);

inspectable(ChatOwnerChangedContext, {
	serialize(context) {
		return {
			id: context.id,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			chatOwnerChanged: context.chatOwnerChanged,
			newOwner: context.newOwner,
		};
	},
});

export { ChatOwnerChangedContext };
