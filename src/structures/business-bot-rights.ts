import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * Represents the rights of a business bot.
 *
 * [Documentation](https://core.telegram.org/bots/api/#businessbotrights)
 */
@Inspectable()
export class BusinessBotRights {
	constructor(public payload: TelegramObjects.TelegramBusinessBotRights) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * True, if the bot can send and edit messages in the private chats that had incoming messages in the last 24 hours
	 */
	@Inspect()
	get canReply() {
		return !!this.payload.can_reply;
	}

	/**
	 * True, if the bot can read messages in the private chats that had incoming messages in the last 24 hours
	 */
	@Inspect()
	get canReadMessages() {
		return !!this.payload.can_read_messages;
	}

	/**
	 * True, if the bot can delete messages sent by the bot
	 */
	@Inspect()
	get canDeleteOutgoingMessages() {
		return !!this.payload.can_delete_outgoing_messages;
	}

	/**
	 * True, if the bot can delete all private messages in managed chats
	 */
	@Inspect()
	get canDeleteAllMessages() {
		return !!this.payload.can_delete_all_messages;
	}

	/**
	 * True, if the bot can edit the first and last name of the business account
	 */
	@Inspect()
	get canEditName() {
		return !!this.payload.can_edit_name;
	}

	/**
	 * True, if the bot can edit the bio of the business account
	 */
	@Inspect()
	get canEditBio() {
		return !!this.payload.can_edit_bio;
	}

	/**
	 * True, if the bot can edit the profile photo of the business account
	 */
	@Inspect()
	get canEditProfilePhoto() {
		return !!this.payload.can_edit_profile_photo;
	}

	/**
	 * True, if the bot can edit the username of the business account
	 */
	@Inspect()
	get canEditUsername() {
		return !!this.payload.can_edit_username;
	}

	/**
	 * True, if the bot can change the privacy settings pertaining to gifts for the business account
	 */
	@Inspect()
	get canChangeGiftSettings() {
		return !!this.payload.can_change_gift_settings;
	}

	/**
	 * True, if the bot can view gifts and the amount of Telegram Stars owned by the business account
	 */
	@Inspect()
	get canViewGiftsAndStars() {
		return !!this.payload.can_view_gifts_and_stars;
	}

	/**
	 * True, if the bot can convert regular gifts owned by the business account to Telegram Stars
	 */
	@Inspect()
	get canConvertGiftsToStars() {
		return !!this.payload.can_convert_gifts_to_stars;
	}

	/**
	 * True, if the bot can transfer and upgrade gifts owned by the business account
	 */
	@Inspect()
	get canTransferAndUpgradeGifts() {
		return !!this.payload.can_transfer_and_upgrade_gifts;
	}

	/**
	 * True, if the bot can transfer Telegram Stars received by the business account to its own account, or use them to upgrade and transfer gifts
	 */
	@Inspect()
	get canTransferStars() {
		return !!this.payload.can_transfer_stars;
	}

	/**
	 * True, if the bot can post, edit and delete stories on behalf of the business account
	 */
	@Inspect()
	get canManageStories() {
		return !!this.payload.can_manage_stories;
	}
}
