import * as Objects from "@gramio/types/objects";
import * as Params from "@gramio/types/params";

import type { Optional } from "#utils";

import { Context } from "../context";
import { NodeMixin } from "./node";
import { TargetMixin } from "./target";

/** This object represents a mixin that is responsible for all the chat management methods */
class ChatControlMixin {
	/** Sets a custom title */
	setCustomTitle(
		title: string,
		params?: Optional<
			Params.SetChatAdministratorCustomTitleParams,
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
		permissions: Objects.TelegramChatPermissions,
		params?: Optional<
			Params.SetChatPermissionsParams,
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
		photo: Params.SetChatPhotoParams["photo"],
		params?: Optional<Params.SetChatPhotoParams, "chat_id" | "photo">,
	) {
		return this.bot.api.setChatPhoto({
			chat_id: this.chatId,
			photo,
			...params,
		});
	}

	/** Deletes a chat photo */
	// INFO: had to rename it from `deleteChatPhoto` because of `TelegramMessage.delete_chat_photo` 😤😤
	removeChatPhoto(params?: Optional<Params.DeleteChatPhotoParams, "chat_id">) {
		return this.bot.api.deleteChatPhoto({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Changes chat title */
	setChatTitle(
		title: string,
		params?: Optional<Params.SetChatTitleParams, "chat_id" | "title">,
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
			Params.SetChatDescriptionParams,
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
			Params.SetChatStickerSetParams,
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
		params?: Optional<Params.DeleteChatStickerSetParams, "chat_id">,
	) {
		return this.bot.api.deleteChatStickerSet({
			chat_id: this.chatId,
			...params,
		});
	}
}

interface ChatControlMixin extends Context, TargetMixin, NodeMixin {}

export { ChatControlMixin };
