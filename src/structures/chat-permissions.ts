import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * Describes actions that a non-administrator user is allowed to take in a chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#chatpermissions)
 */
@Inspectable()
export class ChatPermissions {
	constructor(public payload: TelegramObjects.TelegramChatPermissions) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send text messages, contacts, giveaways, giveaway winners, invoices, locations and venues
	 */
	@Inspect()
	get canSendMessages() {
		return this.payload.can_send_messages;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send audios
	 */
	@Inspect()
	get canSendAudios() {
		return this.payload.can_send_audios;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send documents
	 */
	@Inspect()
	get canSendDocuments() {
		return this.payload.can_send_documents;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send photos
	 */
	@Inspect()
	get canSendPhotos() {
		return this.payload.can_send_photos;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send videos
	 */
	@Inspect()
	get canSendVideos() {
		return this.payload.can_send_videos;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send video notes
	 */
	@Inspect()
	get canSendVideoNotes() {
		return this.payload.can_send_video_notes;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send voice notes
	 */
	@Inspect()
	get canSendVoiceNotes() {
		return this.payload.can_send_voice_notes;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send polls
	 */
	@Inspect()
	get canSendPolls() {
		return this.payload.can_send_polls;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to send animations, games, stickers and use inline bots
	 */
	@Inspect()
	get canSendOtherMessages() {
		return this.payload.can_send_other_messages;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to add web page previews to their messages
	 */
	@Inspect()
	get canAddWebPagePreviews() {
		return this.payload.can_add_web_page_previews;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups
	 */
	@Inspect()
	get canChangeInfo() {
		return this.payload.can_change_info;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to invite new users to the chat
	 */
	@Inspect()
	get canInviteUsers() {
		return this.payload.can_invite_users;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to pin messages. Ignored in public supergroups
	 */
	@Inspect()
	get canPinMessages() {
		return this.payload.can_pin_messages;
	}

	/**
	 * *Optional*. *True*, if the user is allowed to create forum topics. If omitted defaults to the value of can\_pin\_messages
	 */
	@Inspect()
	get canManageTopics() {
		return this.payload.can_manage_topics;
	}

	/** *Optional*. *True*, if the user is allowed to edit their own tag */
	@Inspect()
	get canEditTag() {
		return this.payload.can_edit_tag;
	}
}
