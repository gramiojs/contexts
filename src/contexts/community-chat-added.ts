import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { Community } from "../structures/community";
import { Message } from "../structures/index";
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

interface CommunityChatAddedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a chat being added to a community. */
class CommunityChatAddedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramCommunityChatAdded;

	constructor(options: CommunityChatAddedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "community_chat_added",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.community_chat_added as TelegramObjects.TelegramCommunityChatAdded;
	}

	/** The new community to which the chat belongs */
	get community() {
		return new Community(this.event.community);
	}
}

interface CommunityChatAddedContext<Bot extends BotLike>
	extends Constructor<CommunityChatAddedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			CommunityChatAddedContext<Bot>,
			CommunityChatAddedContextOptions<Bot>
		> {}
applyMixins(CommunityChatAddedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);

memoizeGetters(CommunityChatAddedContext, ["community"]);

inspectable(CommunityChatAddedContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			community: context.community,
		};
	},
});

export { CommunityChatAddedContext };
