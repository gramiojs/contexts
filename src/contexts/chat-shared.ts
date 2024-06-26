import type { TelegramObjects } from "@gramio/types";
import { Message, PhotoSize } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import { Inspect, inspectable } from "inspectable";
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

interface ChatSharedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object contains information about the chat whose identifier was shared with the bot using a `KeyboardButtonRequestChat` button. */
class ChatSharedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramChatShared;

	constructor(options: ChatSharedContextOptions<Bot>) {
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
	@Inspect()
	get requestId() {
		return this.event.request_id;
	}

	/** Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
	@Inspect()
	get sharedChatId() {
		return this.event.chat_id;
	}

	/** Title of the chat, if the title was requested by the bot. */
	@Inspect()
	get title() {
		return this.event.title;
	}

	/** Username of the chat, if the username was requested by the bot and available. */
	@Inspect()
	get username() {
		return this.event.username;
	}

	/** Available sizes of the chat photo, if the photo was requested by the bot. */
	@Inspect()
	get photo() {
		return this.event.photo?.map((size) => new PhotoSize(size));
	}
}

interface ChatSharedContext<Bot extends BotLike>
	extends Constructor<ChatSharedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<Bot, ChatSharedContext<Bot>, ChatSharedContextOptions<Bot>> {}
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
