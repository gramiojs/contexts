import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import { Chat } from "./chat";
import { ChatInviteLink } from "./chat-invite-link";
import { User } from "./user";

/** Represents a join request sent to a chat. */
@Inspectable()
export class ChatJoinRequest {
	constructor(public payload: TelegramObjects.TelegramChatJoinRequest) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Chat to which the request was sent */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** User that sent the join request */
	@Inspect()
	get from() {
		return new User(this.payload.from);
	}

	/** Identifier of a private chat with the user who sent the join request. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot can use this identifier for 24 hours to send messages until the join request is processed, assuming no other administrator contacted the user. */
	@Inspect()
	get userChatId() {
		return this.payload.user_chat_id;
	}

	/** Date the request was sent in Unix time */
	@Inspect()
	get date() {
		return this.payload.date;
	}

	/** Bio of the user */
	@Inspect({ nullable: false })
	get bio() {
		return this.payload.bio;
	}

	/** Chat invite link that was used by the user to send the join request */
	@Inspect({ nullable: false })
	get inviteLink() {
		const { invite_link } = this.payload;

		if (!invite_link) return undefined;

		return new ChatInviteLink(invite_link);
	}
}

memoizeGetters(ChatJoinRequest, ["chat", "from", "inviteLink"]);
