import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a Telegram user or bot. */
@Inspectable()
export class User {
	constructor(public payload: TelegramObjects.TelegramUser) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique identifier for this user or bot */
	@Inspect()
	get id() {
		return Number(this.payload.id);
	}

	/** `true`, if this user is a bot */
	isBot() {
		return this.payload.is_bot;
	}

	/** User's or bot's first name */
	@Inspect()
	get firstName() {
		return this.payload.first_name;
	}

	/** User's or bot's last name */
	@Inspect({ nullable: false })
	get lastName() {
		return this.payload.last_name;
	}

	/** User's or bot's username */
	@Inspect({ nullable: false })
	get username() {
		return this.payload.username;
	}

	/**
	 * [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag)
	 * of the user's language
	 */
	@Inspect({ nullable: false })
	get languageCode() {
		return this.payload.language_code;
	}

	/** `true`, if this user is a Telegram Premium user */
	@Inspect({ compute: true, nullable: false })
	isPremium() {
		return this.payload.is_premium as true | undefined;
	}

	/** `true`, if this user added the bot to the attachment menu */
	@Inspect({ nullable: false })
	get addedToAttachmentMenu() {
		return this.payload.added_to_attachment_menu as true | undefined;
	}

	/**
	 * `true`, if the bot can be invited to groups.
	 *
	 * Returned only in `getMe`.
	 */
	@Inspect({ compute: true, nullable: false })
	canJoinGroups() {
		return this.payload.can_join_groups;
	}

	/**
	 * `true`, if privacy mode is disabled for the bot.
	 *
	 * Returned only in `getMe`.
	 */
	@Inspect({ compute: true, nullable: false })
	canReadAllGroupMessages() {
		return this.payload.can_read_all_group_messages;
	}

	/**
	 * `true`, if the bot supports inline queries.
	 *
	 * Returned only in `getMe`.
	 */
	@Inspect({ compute: true, nullable: false })
	supportsInlineQueries() {
		return this.payload.supports_inline_queries;
	}

	/**
	 * `true`, if the bot can be connected to a Telegram Business account to receive its messages.
	 *
	 * Returned only in `getMe`.
	 */
	@Inspect({ compute: true, nullable: false })
	canConnectToBusiness() {
		return this.payload.can_connect_to_business;
	}
}
