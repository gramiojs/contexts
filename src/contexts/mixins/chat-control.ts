import type { TelegramParams } from "@gramio/types";
import type { TelegramObjects } from "@gramio/types";

import type { Optional } from "#types";

import type { BotLike } from "#types";
import type { Context } from "../context";
import type { NodeMixin } from "./node";
import type { TargetMixin } from "./target";

/** This object represents a mixin that is responsible for all the chat management methods */
class ChatControlMixin<Bot extends BotLike> {
	/** Sets a custom title */
	setCustomTitle(
		title: string,
		params?: Optional<
			TelegramParams.SetChatAdministratorCustomTitleParams,
			"chat_id" | "user_id"
		>,
	) {
		return this.bot.api.setChatAdministratorCustomTitle({
			chat_id: this.chatId,
			user_id: this.senderId!,
			custom_title: title,
			...params,
		});
	}

	/** Sets default chat permissions */
	setChatDefaultPermissions(
		permissions: TelegramObjects.TelegramChatPermissions,
		params?: Optional<
			TelegramParams.SetChatPermissionsParams,
			"chat_id" | "permissions"
		>,
	) {
		return this.bot.api.setChatPermissions({
			chat_id: this.chatId,
			permissions,
			...params,
		});
	}

	/** Sets a new profile photo for the chat */
	setChatPhoto(
		photo: TelegramParams.SetChatPhotoParams["photo"],
		params?: Optional<TelegramParams.SetChatPhotoParams, "chat_id" | "photo">,
	) {
		return this.bot.api.setChatPhoto({
			chat_id: this.chatId,
			photo,
			...params,
		});
	}

	/** Deletes a chat photo */
	// INFO: had to rename it from `deleteChatPhoto` because of `TelegramMessage.delete_chat_photo` 😤😤
	removeChatPhoto(
		params?: Optional<TelegramParams.DeleteChatPhotoParams, "chat_id">,
	) {
		return this.bot.api.deleteChatPhoto({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Changes chat title */
	setChatTitle(
		title: string,
		params?: Optional<TelegramParams.SetChatTitleParams, "chat_id" | "title">,
	) {
		return this.bot.api.setChatTitle({
			chat_id: this.chatId,
			title,
			...params,
		});
	}

	/** Changes chat description */
	setChatDescription(
		description: string,
		params?: Optional<
			TelegramParams.SetChatDescriptionParams,
			"chat_id" | "description"
		>,
	) {
		return this.bot.api.setChatDescription({
			chat_id: this.chatId,
			description,
			...params,
		});
	}

	/** Sets new group stickerset */
	setChatStickerSet(
		name: string,
		params?: Optional<
			TelegramParams.SetChatStickerSetParams,
			"chat_id" | "sticker_set_name"
		>,
	) {
		return this.bot.api.setChatStickerSet({
			chat_id: this.chatId,
			sticker_set_name: name,
			...params,
		});
	}

	/** Deletes group stickerset */
	deleteChatStickerSet(
		params?: Optional<TelegramParams.DeleteChatStickerSetParams, "chat_id">,
	) {
		return this.bot.api.deleteChatStickerSet({
			chat_id: this.chatId,
			...params,
		});
	}
}

interface ChatControlMixin<Bot extends BotLike>
	extends Context<Bot>,
		TargetMixin,
		NodeMixin<Bot> {}

export { ChatControlMixin };
