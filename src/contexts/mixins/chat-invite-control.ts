import type { TelegramParams } from "@gramio/types";

import type { Optional } from "../../types";

import type { Context } from "../context";

import type { BotLike } from "../../types";
import type { TargetMixin } from "./target";

/** This object represents a mixin that works with all `*ChatInviteLink` methods */
class ChatInviteControlMixin<Bot extends BotLike> {
	/** Generates new primary invite link */
	exportInviteLink(
		params?: Optional<TelegramParams.ExportChatInviteLinkParams, "chat_id">,
	) {
		return this.bot.api.exportChatInviteLink({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Creates an additional invite link */
	createInviteLink(
		params?: Optional<TelegramParams.CreateChatInviteLinkParams, "chat_id">,
	) {
		return this.bot.api.createChatInviteLink({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Edits non-primary invite link created by the bot */
	editInviteLink(
		link: string,
		params?: Optional<
			TelegramParams.EditChatInviteLinkParams,
			"chat_id" | "invite_link"
		>,
	) {
		return this.bot.api.editChatInviteLink({
			chat_id: this.chatId,
			invite_link: link,
			...params,
		});
	}

	/** Revokes an invite link generated by a bot */
	revokeInviteLink(
		link: string,
		params?: Optional<
			TelegramParams.RevokeChatInviteLinkParams,
			"chat_id" | "invite_link"
		>,
	) {
		return this.bot.api.revokeChatInviteLink({
			chat_id: this.chatId,
			invite_link: link,
			...params,
		});
	}
}

interface ChatInviteControlMixin<Bot extends BotLike>
	extends Context<Bot>,
		TargetMixin {}

export { ChatInviteControlMixin };
