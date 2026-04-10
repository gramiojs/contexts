import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { Message } from "../structures/index";
import { User } from "../structures/user";
import type { BotLike, Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatMemberControlMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface ManagedBotCreatedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a user creating a bot that will be managed by the current bot. */
class ManagedBotCreatedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramManagedBotCreated;

	constructor(options: ManagedBotCreatedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "managed_bot_created",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.managed_bot_created as TelegramObjects.TelegramManagedBotCreated;
	}

	/**
	 * Information about the bot. The bot's token can be fetched using the method `getManagedBotToken`.
	 */
	get managedBot() {
		return new User(this.event.bot);
	}
}

interface ManagedBotCreatedContext<Bot extends BotLike>
	extends Constructor<ManagedBotCreatedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			ManagedBotCreatedContext<Bot>,
			ManagedBotCreatedContextOptions<Bot>
		> {}
applyMixins(ManagedBotCreatedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);

memoizeGetters(ManagedBotCreatedContext, ["managedBot"]);

inspectable(ManagedBotCreatedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			managedBot: context.managedBot,
		};
	},
});

export { ManagedBotCreatedContext };
