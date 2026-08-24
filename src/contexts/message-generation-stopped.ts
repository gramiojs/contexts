import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { MessageGenerationStopped } from "../structures/message-generation-stopped";
import type { BotLike, Constructor } from "../types";
import { applyMixins } from "../utils";
import { Context } from "./context";
import { CloneMixin, SendMixin } from "./mixins/index";

interface MessageGenerationStoppedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessageGenerationStopped;
	updateId: number;
}

/** Called when a user stops an in-progress message draft. */
class MessageGenerationStoppedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessageGenerationStopped;

	constructor(options: MessageGenerationStoppedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "stopped_message_generation",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Message-generation updates aren't sent on behalf of a user. */
	get senderId() {
		return undefined;
	}

	/** Message-generation updates aren't associated with a business connection. */
	get businessConnectionId() {
		return undefined;
	}

	/** A thread identifier on this update is authoritative for follow-up sends. */
	isTopicMessage() {
		return this.threadId !== undefined;
	}
}

interface MessageGenerationStoppedContext<Bot extends BotLike>
	extends Constructor<MessageGenerationStoppedContext<Bot>>,
		MessageGenerationStopped,
		SendMixin<Bot>,
		CloneMixin<
			Bot,
			MessageGenerationStoppedContext<Bot>,
			MessageGenerationStoppedContextOptions<Bot>
		> {}

applyMixins(MessageGenerationStoppedContext, [
	MessageGenerationStopped,
	SendMixin,
	CloneMixin,
]);

inspectable(MessageGenerationStoppedContext, {
	serialize(context) {
		return {
			draftId: context.draftId,
			threadId: context.threadId,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
		};
	},
});

export { MessageGenerationStoppedContext };
