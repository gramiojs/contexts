import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { AcceptedGiftTypes } from "./accepted-gift-types";
import { Birthdate } from "./birthdate";
import { BusinessIntro } from "./business-intro";
import { BusinessLocation } from "./business-location";
import { BusinessOpeningHours } from "./business-opening-hours";
import { Chat } from "./chat";
import { ChatLocation } from "./chat-location";
import { ChatPermissions } from "./chat-permissions";
import { ChatPhoto } from "./chat-photo";
import { Message } from "./message";
/**
 * This object contains full information about a chat.
 *
 * [Documentation](https://core.telegram.org/bots/api/#chatfullinfo)
 */
@Inspectable()
export class ChatFullInfo {
	constructor(public payload: TelegramObjects.TelegramChatFullInfo) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
	 */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/**
	 * Type of the chat, can be either “private”, “group”, “supergroup” or “channel”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * *Optional*. Title, for supergroups, channels and group chats
	 */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/**
	 * *Optional*. Username, for private chats, supergroups and channels if available
	 */
	@Inspect()
	get username() {
		return this.payload.username;
	}

	/**
	 * *Optional*. First name of the other party in a private chat
	 */
	@Inspect()
	get firstName() {
		return this.payload.first_name;
	}

	/**
	 * *Optional*. Last name of the other party in a private chat
	 */
	@Inspect()
	get lastName() {
		return this.payload.last_name;
	}

	/**
	 * *Optional*. *True*, if the supergroup chat is a forum (has [topics](https://telegram.org/blog/topics-in-groups-collectible-usernames#topics-in-groups) enabled)
	 */
	@Inspect()
	get isForum() {
		return this.payload.is_forum;
	}

	/**
	 * Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See [accent colors](https://core.telegram.org/bots/api/#accent-colors) for more details.
	 */
	@Inspect()
	get accentColorId() {
		return this.payload.accent_color_id;
	}

	/**
	 * The maximum number of reactions that can be set on a message in the chat
	 */
	@Inspect()
	get maxReactionCount() {
		return this.payload.max_reaction_count;
	}

	/**
	 * *Optional*. Chat photo
	 */
	@Inspect()
	get photo() {
		return this.payload.photo ? new ChatPhoto(this.payload.photo) : undefined;
	}

	/**
	 * *Optional*. If non-empty, the list of all [active chat usernames](https://telegram.org/blog/topics-in-groups-collectible-usernames#collectible-usernames); for private chats, supergroups and channels
	 */
	@Inspect()
	get activeUsernames() {
		return this.payload.active_usernames;
	}

	/**
	 * *Optional*. For private chats, the date of birth of the user
	 */
	@Inspect()
	get birthdate() {
		return this.payload.birthdate
			? new Birthdate(this.payload.birthdate)
			: undefined;
	}

	/**
	 * *Optional*. For private chats with business accounts, the intro of the business
	 */
	@Inspect()
	get businessIntro() {
		return this.payload.business_intro
			? new BusinessIntro(this.payload.business_intro)
			: undefined;
	}

	/**
	 * *Optional*. For private chats with business accounts, the location of the business
	 */
	@Inspect()
	get businessLocation() {
		return this.payload.business_location
			? new BusinessLocation(this.payload.business_location)
			: undefined;
	}

	/**
	 * *Optional*. For private chats with business accounts, the opening hours of the business
	 */
	@Inspect()
	get businessOpeningHours() {
		return this.payload.business_opening_hours
			? new BusinessOpeningHours(this.payload.business_opening_hours)
			: undefined;
	}

	/**
	 * *Optional*. For private chats, the personal channel of the user
	 */
	@Inspect()
	get personalChat() {
		return this.payload.personal_chat
			? new Chat(this.payload.personal_chat)
			: undefined;
	}

	/**
	 * *Optional*. List of available reactions allowed in the chat. If omitted, then all [emoji reactions](https://core.telegram.org/bots/api/#reactiontypeemoji) are allowed.
	 */
	@Inspect()
	get availableReactions() {
		return this.payload.available_reactions;
	}

	/**
	 * *Optional*. Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background
	 */
	@Inspect()
	get backgroundCustomEmojiId() {
		return this.payload.background_custom_emoji_id;
	}

	/**
	 * *Optional*. Identifier of the accent color for the chat's profile background. See [profile accent colors](https://core.telegram.org/bots/api/#profile-accent-colors) for more details.
	 */
	@Inspect()
	get profileAccentColorId() {
		return this.payload.profile_accent_color_id;
	}

	/**
	 * *Optional*. Custom emoji identifier of the emoji chosen by the chat for its profile background
	 */
	@Inspect()
	get profileBackgroundCustomEmojiId() {
		return this.payload.profile_background_custom_emoji_id;
	}

	/**
	 * *Optional*. Custom emoji identifier of the emoji status of the chat or the other party in a private chat
	 */
	@Inspect()
	get emojiStatusCustomEmojiId() {
		return this.payload.emoji_status_custom_emoji_id;
	}

	/**
	 * *Optional*. Expiration date of the emoji status of the chat or the other party in a private chat, in Unix time, if any
	 */
	@Inspect()
	get emojiStatusExpirationDate() {
		return this.payload.emoji_status_expiration_date;
	}

	/**
	 * *Optional*. Bio of the other party in a private chat
	 */
	@Inspect()
	get bio() {
		return this.payload.bio;
	}

	/**
	 * *Optional*. *True*, if privacy settings of the other party in the private chat allows to use `tg://user?id=<user_id>` links only in chats with the user
	 */
	@Inspect()
	get hasPrivateForwards() {
		return this.payload.has_private_forwards;
	}

	/**
	 * *Optional*. *True*, if the privacy settings of the other party restrict sending voice and video note messages in the private chat
	 */
	@Inspect()
	get hasRestrictedVoiceAndVideoMessages() {
		return this.payload.has_restricted_voice_and_video_messages;
	}

	/**
	 * *Optional*. *True*, if users need to join the supergroup before they can send messages
	 */
	@Inspect()
	get joinToSendMessages() {
		return this.payload.join_to_send_messages;
	}

	/**
	 * *Optional*. *True*, if all users directly joining the supergroup need to be approved by supergroup administrators
	 */
	@Inspect()
	get joinByRequest() {
		return this.payload.join_by_request;
	}

	/**
	 * *Optional*. Description, for groups, supergroups and channel chats
	 */
	@Inspect()
	get description() {
		return this.payload.description;
	}

	/**
	 * *Optional*. Primary invite link, for groups, supergroups and channel chats
	 */
	@Inspect()
	get inviteLink() {
		return this.payload.invite_link;
	}

	/**
	 * *Optional*. The most recent pinned message (by sending date)
	 */
	@Inspect()
	get pinnedMessage() {
		return this.payload.pinned_message
			? new Message(this.payload.pinned_message)
			: undefined;
	}

	/**
	 * *Optional*. Default chat member permissions, for groups and supergroups
	 */
	@Inspect()
	get permissions() {
		return this.payload.permissions
			? new ChatPermissions(this.payload.permissions)
			: undefined;
	}

	/**
	 * *Optional*. For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user; in seconds
	 */
	@Inspect()
	get slowModeDelay() {
		return this.payload.slow_mode_delay;
	}

	/**
	 * *Optional*. For supergroups, the minimum number of boosts that a non-administrator user needs to add in order to ignore slow mode and chat permissions
	 */
	@Inspect()
	get unrestrictBoostCount() {
		return this.payload.unrestrict_boost_count;
	}

	/**
	 * *Optional*. The time after which all messages sent to the chat will be automatically deleted; in seconds
	 */
	@Inspect()
	get messageAutoDeleteTime() {
		return this.payload.message_auto_delete_time;
	}

	/**
	 * *Optional*. *True*, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators.
	 */
	@Inspect()
	get hasAggressiveAntiSpamEnabled() {
		return this.payload.has_aggressive_anti_spam_enabled;
	}

	/**
	 * *Optional*. *True*, if non-administrators can only get the list of bots and administrators in the chat
	 */
	@Inspect()
	get hasHiddenMembers() {
		return this.payload.has_hidden_members;
	}

	/**
	 * *Optional*. *True*, if messages from the chat can't be forwarded to other chats
	 */
	@Inspect()
	get hasProtectedContent() {
		return this.payload.has_protected_content;
	}

	/**
	 * *Optional*. *True*, if new chat members will have access to old messages; available only to chat administrators
	 */
	@Inspect()
	get hasVisibleHistory() {
		return this.payload.has_visible_history;
	}

	/**
	 * *Optional*. For supergroups, name of the group sticker set
	 */
	@Inspect()
	get stickerSetName() {
		return this.payload.sticker_set_name;
	}

	/**
	 * *Optional*. *True*, if the bot can change the group sticker set
	 */
	@Inspect()
	get canSendPaidMedia() {
		return this.payload.can_send_paid_media;
	}
	/**
	 * *Optional*. *True*, if the bot can change the group sticker set
	 */
	@Inspect()
	get canSetStickerSet() {
		return this.payload.can_set_sticker_set;
	}

	@Inspect()
	get canSendGift() {
		return (
			this.payload.accepted_gift_types.limited_gifts ||
			this.payload.accepted_gift_types.unlimited_gifts ||
			this.payload.accepted_gift_types.premium_subscription ||
			this.payload.accepted_gift_types.unique_gifts
		);
	}

	@Inspect()
	get acceptedGiftTypes() {
		return new AcceptedGiftTypes(this.payload.accepted_gift_types);
	}

	/**
	 * *Optional*. For supergroups, the name of the group's custom emoji sticker set. Custom emoji from this set can be used by all users and bots in the group.
	 */
	@Inspect()
	get customEmojiStickerSetName() {
		return this.payload.custom_emoji_sticker_set_name;
	}

	/**
	 * *Optional*. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
	 */
	@Inspect()
	get linkedChatId() {
		return this.payload.linked_chat_id;
	}

	/**
	 * *Optional*. For supergroups, the location to which the supergroup is connected
	 */
	@Inspect()
	get location() {
		return this.payload.location
			? new ChatLocation(this.payload.location)
			: undefined;
	}
}
memoizeGetters(ChatFullInfo, [
	"photo",
	"birthdate",
	"businessIntro",
	"businessLocation",
	"businessOpeningHours",
	"personalChat",
	"pinnedMessage",
	"permissions",
	"location",
]);
