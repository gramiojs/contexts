import type { TelegramParams } from "@gramio/types";

import type { Optional, RequireValue } from "../../types";

import type { BotLike } from "../../types";
import type { Context } from "../context";
import type { NodeMixin } from "./node";

interface ForumMixinMetadata {
	get threadId(): number | undefined;
}

// TODO: there probably is a way to hide all irrelevant methods unless type guard said so
/** This object represents a mixin that's used in all topic-related updates  */
class ForumMixin<Bot extends BotLike> {
	/** Checks whether this topic is actually a 'General' one */
	isGeneralTopic(): this is RequireValue<this, "threadId", undefined> {
		return this.threadId === undefined;
	}

	/** Returns custom emoji stickers, which can be used as a forum topic icon by any user */
	getTopicIcons() {
		return this.bot.api.getForumTopicIconStickers();
	}

	/** Creates a topic */
	createTopic(
		name: string,
		params?: Optional<
			TelegramParams.CreateForumTopicParams,
			"chat_id" | "name"
		>,
	) {
		return this.bot.api.createForumTopic({
			chat_id: this.chatId,
			name,
			...params,
		});
	}

	/** Edits topic info */
	editTopic(
		params: Optional<
			TelegramParams.EditForumTopicParams,
			"chat_id" | "message_thread_id"
		>,
	) {
		if (this.isGeneralTopic()) {
			throw new TypeError(
				"called `editTopic` on a General topic; use `editGeneralTopic` instead",
			);
		}

		return this.bot.api.editForumTopic({
			chat_id: this.chatId,
			message_thread_id: this.threadId!,
			...params,
		});
	}

	/** Edits General topic info */
	editGeneralTopic(
		params: Optional<TelegramParams.EditGeneralForumTopicParams, "chat_id">,
	) {
		return this.bot.api.editGeneralForumTopic({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Closes topic */
	closeTopic(
		params?: Optional<
			TelegramParams.CloseForumTopicParams,
			"chat_id" | "message_thread_id"
		>,
	) {
		if (this.isGeneralTopic()) {
			throw new TypeError(
				"called `closeTopic` on a General topic; use `closeGeneralTopic` instead",
			);
		}

		return this.bot.api.closeForumTopic({
			chat_id: this.chatId,
			message_thread_id: this.threadId!,
			...params,
		});
	}

	/** Closes General topic */
	closeGeneralTopic(
		params?: Optional<TelegramParams.CloseGeneralForumTopicParams, "chat_id">,
	) {
		return this.bot.api.closeGeneralForumTopic({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Reopens topic */
	reopenTopic(
		params?: Optional<
			TelegramParams.ReopenForumTopicParams,
			"chat_id" | "message_thread_id"
		>,
	) {
		if (this.isGeneralTopic()) {
			throw new TypeError(
				"called `reopenTopic` on a General topic; use `reopenGeneralTopic` instead",
			);
		}

		return this.bot.api.reopenForumTopic({
			chat_id: this.chatId,
			message_thread_id: this.threadId!,
			...params,
		});
	}

	/** Reopens General topic */
	reopenGeneralTopic(
		params?: Optional<TelegramParams.ReopenGeneralForumTopicParams, "chat_id">,
	) {
		return this.bot.api.reopenGeneralForumTopic({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Deletes topic along with all its messages */
	deleteTopic(
		params?: Optional<
			TelegramParams.DeleteForumTopicParams,
			"chat_id" | "message_thread_id"
		>,
	) {
		if (this.isGeneralTopic()) {
			throw new TypeError("called `deleteTopic` on a General topic");
		}

		return this.bot.api.deleteForumTopic({
			chat_id: this.chatId,
			message_thread_id: this.threadId!,
			...params,
		});
	}

	/** Clears the list of pinned messages */
	unpinAllTopicMessages(
		params?: Optional<
			TelegramParams.UnpinAllForumTopicMessagesParams,
			"chat_id" | "message_thread_id"
		>,
	) {
		if (this.isGeneralTopic()) {
			throw new TypeError(
				"called `unpinAllTopicMessages` on a General topic; use `unpinAllGeneralTopicMessages` instead",
			);
		}

		return this.bot.api.unpinAllForumTopicMessages({
			chat_id: this.chatId,
			message_thread_id: this.threadId!,
			...params,
		});
	}

	/** Clears the list of pinned messages in a General topic */
	unpinAllGeneralTopicMessages(
		params?: Optional<
			TelegramParams.UnpinAllGeneralForumTopicMessagesParams,
			"chat_id"
		>,
	) {
		return this.bot.api.unpinAllGeneralForumTopicMessages({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Hides General topic */
	hideGeneralTopic(
		params?: Optional<TelegramParams.HideGeneralForumTopicParams, "chat_id">,
	) {
		return this.bot.api.hideGeneralForumTopic({
			chat_id: this.chatId,
			...params,
		});
	}

	/** Unhides General topic */
	unhideGeneralTopic(
		params?: Optional<TelegramParams.UnhideGeneralForumTopicParams, "chat_id">,
	) {
		return this.bot.api.unhideGeneralForumTopic({
			chat_id: this.chatId,
			...params,
		});
	}
}

interface ForumMixin<Bot extends BotLike>
	extends Context<Bot>,
		ForumMixinMetadata,
		NodeMixin<Bot> {}

export { ForumMixin };
