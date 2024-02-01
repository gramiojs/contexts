import * as Interfaces from "@gramio/types/objects";
import * as Params from "@gramio/types/params";

import type { Optional } from "#utils";

import { Context } from "../context";

import { NodeMixin } from "./node";
import { TargetMixin } from "./target";

/** This object represents a mixin that is able to control member's rights */
class ChatMemberControlMixin {
	/** Bans a user (o_O) */
	banMember(
		params?: Optional<Params.BanChatMemberParams, "chat_id" | "user_id">,
	) {
		return this.bot.api.banChatMember({
			chat_id: this.chatId,
			user_id: this.senderId!,
			...params,
		});
	}

	/** Unbans a user (O_o) */
	unbanMember(
		params?: Optional<Params.UnbanChatMemberParams, "chat_id" | "user_id">,
	) {
		return this.bot.api.unbanChatMember({
			chat_id: this.chatId,
			user_id: this.senderId!,
			...params,
		});
	}

	/** Restricts a user (O_O) */
	restrictMember(
		permissions: Interfaces.TelegramChatPermissions,
		params?: Optional<Params.RestrictChatMemberParams, "chat_id" | "user_id">,
	) {
		return this.bot.api.restrictChatMember({
			chat_id: this.chatId,
			permissions,
			user_id: this.senderId!,
			...params,
		});
	}

	/** Promotes/demotes a user (o_o) */
	promoteMember(
		params?: Optional<Params.PromoteChatMemberParams, "chat_id" | "user_id">,
	) {
		return this.bot.api.promoteChatMember({
			chat_id: this.chatId,
			user_id: this.senderId!,
			...params,
		});
	}
}

interface ChatMemberControlMixin extends Context, TargetMixin, NodeMixin {}

export { ChatMemberControlMixin };
