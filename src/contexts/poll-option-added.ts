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

interface PollOptionAddedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about an option added to a poll. */
class PollOptionAddedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramPollOptionAdded;

	constructor(options: PollOptionAddedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "poll_option_added",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.poll_option_added as TelegramObjects.TelegramPollOptionAdded;
	}

	/**
	 * *Optional*. Message containing the poll to which the option was added, if known.
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

	/** Unique identifier of the added option */
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

interface PollOptionAddedContext<Bot extends BotLike>
	extends Constructor<PollOptionAddedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			PollOptionAddedContext<Bot>,
			PollOptionAddedContextOptions<Bot>
		> {}
applyMixins(PollOptionAddedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

memoizeGetters(PollOptionAddedContext, ["pollMessage", "optionTextEntities"]);

inspectable(PollOptionAddedContext, {
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

export { PollOptionAddedContext };
