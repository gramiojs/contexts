import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { Community } from "../structures/community";
import { Message } from "../structures/message";
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

interface CommunityChatJoinedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** A service message about a chat joining a community. */
class CommunityChatJoinedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;
	private event: TelegramObjects.TelegramCommunityChatJoined;

	constructor(options: CommunityChatJoinedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "community_chat_joined",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.community_chat_joined as TelegramObjects.TelegramCommunityChatJoined;
	}

	/** The community from which the chat was joined. */
	get community() {
		return new Community(this.event.community);
	}
}

interface CommunityChatJoinedContext<Bot extends BotLike>
	extends Constructor<CommunityChatJoinedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			CommunityChatJoinedContext<Bot>,
			CommunityChatJoinedContextOptions<Bot>
		> {}

applyMixins(CommunityChatJoinedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);

memoizeGetters(CommunityChatJoinedContext, ["community"]);

inspectable(CommunityChatJoinedContext, {
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

export { CommunityChatJoinedContext };
