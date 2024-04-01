import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "#utils";
import { Chat } from "./chat";
import { ChatInviteLink } from "./chat-invite-link";
import { ChatMember } from "./chat-member";
import { User } from "./user";

/** This object represents changes in the status of a chat member. */
@Inspectable()
export class ChatMemberUpdated {
	constructor(public payload: TelegramObjects.TelegramChatMemberUpdated) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Chat the user belongs to */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** Performer of the action, which resulted in the change */
	@Inspect()
	get from() {
		return new User(this.payload.from);
	}

	/** Date the change was done in Unix time */
	@Inspect()
	get date() {
		return this.payload.date;
	}

	/** Previous information about the chat member */
	@Inspect()
	get oldChatMember() {
		return new ChatMember(this.payload.old_chat_member);
	}

	/** New information about the chat member */
	@Inspect()
	get newChatMember() {
		return new ChatMember(this.payload.new_chat_member);
	}

	/**
	 * Chat invite link, which was used by the user to join the chat;
	 * for joining by invite link events only.
	 */
	@Inspect({ nullable: false })
	get inviteLink() {
		const { invite_link } = this.payload;

		if (!invite_link) return undefined;

		return new ChatInviteLink(invite_link);
	}

	/** `true`, if the user joined the chat via a chat folder invite link */
	@Inspect({ nullable: false })
	get viaChatFolderInviteLink() {
		return this.payload.via_chat_folder_invite_link;
	}
}

memoizeGetters(ChatMemberUpdated, [
	"chat",
	"from",
	"oldChatMember",
	"newChatMember",
	"inviteLink",
]);
