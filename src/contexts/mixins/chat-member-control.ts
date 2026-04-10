import type { TelegramObjects, TelegramParams } from "@gramio/types";
import type { BotLike, Optional } from "../../types";
import type { Context } from "../context";
import type { NodeMixin } from "./node";
import type { TargetMixin } from "./target";

/** This object represents a mixin that is able to control member's rights */
class ChatMemberControlMixin<Bot extends BotLike> {
	/** Bans a user (o_O) */
	banMember(
		params?: Optional<
			TelegramParams.BanChatMemberParams,
			"chat_id" | "user_id"
		>,
	) {
		return this.bot.api.banChatMember({
			chat_id: this.chatId,
			user_id: this.senderId!,
			...params,
		});
	}

	/** Unbans a user (O_o) */
	unbanMember(
		params?: Optional<
			TelegramParams.UnbanChatMemberParams,
			"chat_id" | "user_id"
		>,
	) {
		return this.bot.api.unbanChatMember({
			chat_id: this.chatId,
			user_id: this.senderId!,
			...params,
		});
	}

	/** Restricts a user (O_O) */
	restrictMember(
		permissions: TelegramObjects.TelegramChatPermissions,
		params?: Optional<
			TelegramParams.RestrictChatMemberParams,
			"chat_id" | "user_id"
		>,
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
		params?: Optional<
			TelegramParams.PromoteChatMemberParams,
			"chat_id" | "user_id"
		>,
	) {
		return this.bot.api.promoteChatMember({
			chat_id: this.chatId,
			user_id: this.senderId!,
			...params,
		});
	}

	/** Sets a tag for a regular member */
	setMemberTag(
		tag: string | undefined,
		params?: Optional<
			TelegramParams.SetChatMemberTagParams,
			"chat_id" | "user_id" | "tag"
		>,
	) {
		return this.bot.api.setChatMemberTag({
			chat_id: this.chatId,
			user_id: this.senderId!,
			tag,
			...params,
		});
	}

	/** Returns the token of a managed bot */
	getManagedBotToken(
		params?: Optional<TelegramParams.GetManagedBotTokenParams, "user_id">,
	) {
		return this.bot.api.getManagedBotToken({
			user_id: this.senderId!,
			...params,
		});
	}

	/** Revokes the current token of a managed bot and generates a new one */
	replaceManagedBotToken(
		params?: Optional<TelegramParams.ReplaceManagedBotTokenParams, "user_id">,
	) {
		return this.bot.api.replaceManagedBotToken({
			user_id: this.senderId!,
			...params,
		});
	}
}

interface ChatMemberControlMixin<Bot extends BotLike>
	extends Context<Bot>,
		TargetMixin,
		NodeMixin<Bot> {}

export { ChatMemberControlMixin };
