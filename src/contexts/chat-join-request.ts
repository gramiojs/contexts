import type { TelegramObjects, TelegramParams } from "@gramio/types";
import { inspectable } from "inspectable";
import { ChatJoinRequest } from "../structures/index";
import type { BotLike, Constructor } from "../types";
import { applyMixins } from "../utils";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatInviteControlMixin,
	CloneMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface ChatJoinRequestContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramChatJoinRequest;
	updateId: number;
}

/**
 * Represents a join request sent to a chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#chatjoinrequest)
 */
class ChatJoinRequestContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramChatJoinRequest;

	constructor(options: ChatJoinRequestContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "chat_join_request",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Approves chat join request */
	approve() {
		return this.bot.api.approveChatJoinRequest({
			chat_id: this.chatId,
			user_id: this.userChatId,
		});
	}

	/** Declines chat join request */
	decline() {
		return this.bot.api.declineChatJoinRequest({
			chat_id: this.chatId,
			user_id: this.userChatId,
		});
	}

	/**
	 * Processes the received chat join request query.
	 *
	 * Requires `query_id` to be present on the join request — the bot must
	 * respond within 10 seconds.
	 */
	answerQuery(
		result: TelegramParams.AnswerChatJoinRequestQueryParams["result"],
	) {
		return this.bot.api.answerChatJoinRequestQuery({
			chat_join_request_query_id: this.payload.query_id as string,
			result,
		});
	}

	/**
	 * Processes the received chat join request query by showing a Mini App to
	 * the user before deciding the outcome.
	 *
	 * Requires `query_id` to be present on the join request — the bot must
	 * respond within 10 seconds.
	 */
	sendQueryWebApp(webAppUrl: string) {
		return this.bot.api.sendChatJoinRequestWebApp({
			chat_join_request_query_id: this.payload.query_id as string,
			web_app_url: webAppUrl,
		});
	}
}

// @ts-expect-error [senderId: number] is not compatible with [senderId: number | undefined] :shrug:
interface ChatJoinRequestContext<Bot extends BotLike>
	extends Constructor<ChatJoinRequestContext<Bot>>,
		ChatJoinRequest,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		CloneMixin<
			Bot,
			ChatJoinRequestContext<Bot>,
			ChatJoinRequestContextOptions<Bot>
		> {}
applyMixins(ChatJoinRequestContext, [
	ChatJoinRequest,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	ChatInviteControlMixin,
	CloneMixin,
]);

inspectable(ChatJoinRequestContext, {
	serialize(context) {
		return {
			chat: context.chat,
			from: context.from,
			date: context.date,
			bio: context.bio,
			inviteLink: context.inviteLink,
			queryId: context.queryId,
		};
	},
});

export { ChatJoinRequestContext };
