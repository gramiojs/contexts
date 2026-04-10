import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { InaccessibleMessage } from "../structures/inaccessible-message";
import { Message } from "../structures/index";
import { MessageEntity } from "../structures/message-entity";
import type { BotLike, Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface PollOptionDeletedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about an option deleted from a poll. */
class PollOptionDeletedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramPollOptionDeleted;

	constructor(options: PollOptionDeletedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "poll_option_deleted",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.poll_option_deleted as TelegramObjects.TelegramPollOptionDeleted;
	}

	/**
	 * *Optional*. Message containing the poll from which the option was deleted, if known.
	 */
	get pollMessage():
		| InaccessibleMessage
		| Omit<Message, "replyMessage">
		| undefined {
		const { poll_message } = this.event;

		if (!poll_message) return undefined;

		if (poll_message.date === 0) {
			return new InaccessibleMessage(poll_message);
		}

		return new Message(poll_message);
	}

	/** Unique identifier of the deleted option */
	get optionPersistentId() {
		return this.event.option_persistent_id;
	}

	/** Option text */
	get optionText() {
		return this.event.option_text;
	}

	/** *Optional*. Special entities that appear in the *optionText* */
	get optionTextEntities() {
		const { option_text_entities } = this.event;

		if (!option_text_entities) return undefined;

		return option_text_entities.map((entity) => new MessageEntity(entity));
	}
}

interface PollOptionDeletedContext<Bot extends BotLike>
	extends Constructor<PollOptionDeletedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			PollOptionDeletedContext<Bot>,
			PollOptionDeletedContextOptions<Bot>
		> {}
applyMixins(PollOptionDeletedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

memoizeGetters(PollOptionDeletedContext, ["pollMessage", "optionTextEntities"]);

inspectable(PollOptionDeletedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			pollMessage: context.pollMessage,
			optionPersistentId: context.optionPersistentId,
			optionText: context.optionText,
			optionTextEntities: context.optionTextEntities,
		};
	},
});

export { PollOptionDeletedContext };
