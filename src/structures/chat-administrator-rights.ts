import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** Represents the rights of an administrator in a chat. */
@Inspectable()
export class ChatAdministratorRights {
	constructor(
		public payload: TelegramObjects.TelegramChatAdministratorRights,
	) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** `true`, if the user's presence in the chat is hidden */
	@Inspect({ compute: true })
	isAnonymous() {
		return this.payload.is_anonymous;
	}

	/** `true`, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege */
	@Inspect({ compute: true })
	canManageChat() {
		return this.payload.can_manage_chat;
	}

	/** `true`, if the administrator can delete messages of other users */
	@Inspect({ compute: true })
	canDeleteMessages() {
		return this.payload.can_delete_messages;
	}

	/** `true`, if the administrator can manage video chats */
	@Inspect({ compute: true })
	canManageVideoChats() {
		return this.payload.can_manage_video_chats;
	}

	/** `true`, if the administrator can restrict, ban or unban chat members */
	@Inspect({ compute: true })
	canRestrictMembers() {
		return this.payload.can_restrict_members;
	}

	/** `true`, if the administrator can add new administrators with a subset of their own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
	@Inspect({ compute: true })
	canPromoteMembers() {
		return this.payload.can_promote_members;
	}

	/** `true`, if the user is allowed to change the chat title, photo and other settings */
	@Inspect({ compute: true })
	canChangeInfo() {
		return this.payload.can_change_info;
	}

	/** `true`, if the user is allowed to invite new users to the chat */
	@Inspect({ compute: true })
	canInviteUsers() {
		return this.payload.can_invite_users;
	}

	/** `true`, if the administrator can post in the channel; channels only */
	@Inspect({ compute: true })
	canPostMessages() {
		return this.payload.can_post_messages;
	}

	/** `true`, if the administrator can edit messages of other users and can pin messages; channels only */
	@Inspect({ compute: true })
	canEditMessages() {
		return this.payload.can_edit_messages;
	}

	/** `true`, if the user is allowed to pin messages; groups and supergroups only */
	@Inspect({ compute: true })
	canPinMessages() {
		return this.payload.can_pin_messages;
	}

	/** `true`, if the administrator can post stories in the channel; channels only */
	@Inspect({ compute: true })
	canPostStories() {
		return this.payload.can_post_stories;
	}

	/** `true`, if the administrator can edit stories posted by other users; channels only */
	@Inspect({ compute: true })
	canEditStories() {
		return this.payload.can_edit_stories;
	}

	/** `true`, if the administrator can delete stories posted by other users; channels only */
	@Inspect({ compute: true })
	canDeleteStories() {
		return this.payload.can_delete_stories;
	}

	/** `true`, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only */
	@Inspect({ compute: true })
	canManageTopics() {
		return this.payload.can_manage_topics;
	}
}
