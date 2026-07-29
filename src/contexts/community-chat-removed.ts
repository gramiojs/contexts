import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { Message } from "../structures/index";
import type { BotLike, Constructor } from "../types";
import { applyMixins } from "../utils";
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

interface CommunityChatRemovedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/**
 * This object represents a service message about a chat being removed from a
 * community. Currently holds no information.
 */
class CommunityChatRemovedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	constructor(options: CommunityChatRemovedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "community_chat_removed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface CommunityChatRemovedContext<Bot extends BotLike>
	extends Constructor<CommunityChatRemovedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			CommunityChatRemovedContext<Bot>,
			CommunityChatRemovedContextOptions<Bot>
		> {}
applyMixins(CommunityChatRemovedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(CommunityChatRemovedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
		};
	},
});

export { CommunityChatRemovedContext };
