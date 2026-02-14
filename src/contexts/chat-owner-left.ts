import type { TelegramObjects } from "@gramio/types";
import { ChatOwnerLeft, Message, User } from "../structures/index";

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

interface ChatOwnerLeftContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about the chat owner leaving the chat. */
class ChatOwnerLeftContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramChatOwnerLeft;

	constructor(options: ChatOwnerLeftContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "chat_owner_left",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.chat_owner_left as TelegramObjects.TelegramChatOwnerLeft;
	}

	/** Service message: chat owner left information */
	get chatOwnerLeft() {
		return new ChatOwnerLeft(this.event);
	}

	/** *Optional*. The user which will be the new owner of the chat if the previous owner does not return to the chat */
	get newOwner() {
		const { new_owner } = this.event;

		if (!new_owner) return undefined;

		return new User(new_owner);
	}
}

interface ChatOwnerLeftContext<Bot extends BotLike>
	extends Constructor<ChatOwnerLeftContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			ChatOwnerLeftContext<Bot>,
			ChatOwnerLeftContextOptions<Bot>
		> {}
applyMixins(ChatOwnerLeftContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(ChatOwnerLeftContext, ["chatOwnerLeft", "newOwner"]);

inspectable(ChatOwnerLeftContext, {
	serialize(context) {
		return {
			id: context.id,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			chatOwnerLeft: context.chatOwnerLeft,
			newOwner: context.newOwner,
		};
	},
});

export { ChatOwnerLeftContext };
