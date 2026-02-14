import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { Chat } from "./chat";
import { ChatShared } from "./chat-shared";
import { Contact } from "./contact";
import { Dice } from "./dice";
import { ExternalReplyInfo } from "./external-reply-info";
import { ForumTopicClosed } from "./forum-topic-closed";
import { ForumTopicCreated } from "./forum-topic-created";
import { ForumTopicEdited } from "./forum-topic-edited";
import { ForumTopicReopened } from "./forum-topic-reopened";
import { Game } from "./game";
import { GeneralForumTopicHidden } from "./general-forum-topic-hidden";
import { GeneralForumTopicUnhidden } from "./general-forum-topic-unhidden";
import { InaccessibleMessage } from "./inaccessible-message";
import { InlineKeyboardMarkup } from "./inline-keyboard-markup";
import { Invoice } from "./invoice";
import { LinkPreviewOptions } from "./link-preview-options";
import { Location } from "./location";
import { MessageAutoDeleteTimerChanged } from "./message-auto-delete-timer-changed";
import { MessageEntity } from "./message-entity";
import {
	MessageOriginChannel,
	MessageOriginChat,
	MessageOriginHiddenUser,
	MessageOriginUser,
} from "./message-origin/index";
import { PassportData } from "./passport-data";
import { PhotoSize } from "./photo-size";
import { Poll } from "./poll";
import { ProximityAlertTriggered } from "./proximity-alert-triggered";
import { SuccessfulPayment } from "./successful-payment";
import { TextQuote } from "./text-quote";
import { User } from "./user";
import { UsersShared } from "./users-shared";
import { Venue } from "./venue";
import { VideoChatEnded } from "./video-chat-ended";
import { VideoChatParticipantsInvited } from "./video-chat-participants-invited";
import { VideoChatScheduled } from "./video-chat-scheduled";
import { VideoChatStarted } from "./video-chat-started";
import { WebAppData } from "./web-app-data";
import { WriteAccessAllowed } from "./write-access-allowed";

import {
	AnimationAttachment,
	AudioAttachment,
	DocumentAttachment,
	StickerAttachment,
	StoryAttachment,
	VideoAttachment,
	VideoNoteAttachment,
	VoiceAttachment,
} from "./attachments/index";

import { memoizeGetters } from "../utils";
import { ChatBackground } from "./chat-background";
import { ChatBoostAdded } from "./chat-boost-added";
import { Checklist } from "./checklist";
import { ChecklistTasksAdded } from "./checklist-tasks-added";
import { ChecklistTasksDone } from "./checklist-tasks-done";
import { DirectMessagePriceChanged } from "./direct-message-price-changed";
import { DirectMessagesTopic } from "./direct-messages-topic";
import { GiftInfo } from "./gift-info";
import { Giveaway } from "./giveaway";
import { GiveawayCompleted } from "./giveaway-completed";
import { GiveawayCreated } from "./giveaway-created";
import { GiveawayWinners } from "./giveaway-winners";
import { Story } from "./story";
import { SuggestedPostApprovalFailed } from "./suggested-post-approval-failed";
import { SuggestedPostApproved } from "./suggested-post-approved";
import { SuggestedPostDeclined } from "./suggested-post-declined";
import { SuggestedPostInfo } from "./suggested-post-info";
import { SuggestedPostPaid } from "./suggested-post-paid";
import { SuggestedPostRefunded } from "./suggested-post-refunded";
import { UniqueGiftInfo } from "./unique-gift-info";

/** This object represents a message. */
@Inspectable()
export class Message {
	constructor(public payload: TelegramObjects.TelegramMessage) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique message identifier inside this chat */
	@Inspect()
	get id() {
		return this.payload.message_id;
	}

	/** Unique identifier of a message thread to which the message belongs; for supergroups only */
	@Inspect({ nullable: false })
	get threadId() {
		return this.payload.message_thread_id;
	}

	/** *Optional*. Information about the direct messages chat topic that contains the message */
	@Inspect({ nullable: false })
	get directMessagesTopic() {
		const { direct_messages_topic } = this.payload;

		if (!direct_messages_topic) return undefined;

		return new DirectMessagesTopic(direct_messages_topic);
	}

	/** Sender, empty for messages sent to channels */
	@Inspect({ nullable: false })
	get from() {
		const { from } = this.payload;

		if (!from) return undefined;

		return new User(from);
	}

	/**
	 * Sender of the message, sent on behalf of a chat.
	 * The channel itself for channel messages.
	 * The supergroup itself for messages from anonymous group administrators.
	 * The linked channel for messages automatically forwarded to the discussion group
	 */
	@Inspect({ nullable: false })
	get senderChat() {
		const { sender_chat } = this.payload;

		if (!sender_chat) return undefined;

		return new Chat(sender_chat);
	}

	/** If the sender of the message boosted the chat, the number of boosts added by the user */
	@Inspect({ nullable: false })
	get senderBoostCount() {
		return this.payload.sender_boost_count;
	}

	/** The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account. */
	@Inspect({ nullable: false })
	get senderBusinessBot() {
		return this.payload.sender_business_bot
			? new User(this.payload.sender_business_bot)
			: undefined;
	}

	/** Date the message was sent in Unix time */
	@Inspect()
	get createdAt() {
		return this.payload.date;
	}

	/** Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier. */
	@Inspect()
	get businessConnectionId() {
		return this.payload.business_connection_id;
	}

	/** Conversation the message belongs to */
	@Inspect()
	get chat() {
		return new Chat(this.payload.chat);
	}

	/** Information about the original message for forwarded messages */
	@Inspect({ nullable: false })
	get forwardOrigin() {
		if (!this.payload.forward_origin) return undefined;

		// TODO: simplify

		if (this.payload.forward_origin.type === "user") {
			return new MessageOriginUser(this.payload.forward_origin);
		}

		if (this.payload.forward_origin.type === "chat") {
			return new MessageOriginChat(this.payload.forward_origin);
		}

		if (this.payload.forward_origin.type === "channel") {
			return new MessageOriginChannel(this.payload.forward_origin);
		}

		if (this.payload.forward_origin.type === "hidden_user") {
			return new MessageOriginHiddenUser(this.payload.forward_origin);
		}

		throw new TypeError("unknown message origin type");
	}

	/** `true`, if the message is sent to a forum topic */
	@Inspect({ compute: true, nullable: false })
	isTopicMessage() {
		return this.payload.is_topic_message;
	}

	/** `true`, if the message is a channel post that was automatically forwarded to the connected discussion group */
	@Inspect({ compute: true, nullable: false })
	isAutomaticForward() {
		return this.payload.is_automatic_forward;
	}

	/** For replies, the original message */
	@Inspect({ nullable: false })
	get replyMessage(): Omit<Message, "replyMessage"> | undefined {
		const { reply_to_message } = this.payload;

		if (!reply_to_message) return undefined;

		return new Message(reply_to_message);
	}

	/**  For replies to a story, the original story */
	@Inspect({ nullable: false })
	get replyStory() {
		const { reply_to_story } = this.payload;

		if (!reply_to_story) return undefined;

		return new Story(reply_to_story);
	}

	/** *Optional*. Identifier of the specific checklist task that is being replied to */
	@Inspect({ nullable: false })
	get replyToChecklistTaskId() {
		return this.payload.reply_to_checklist_task_id;
	}

	@Inspect()
	get checklist() {
		const { checklist } = this.payload;

		if (!checklist) {
			return undefined;
		}

		return new Checklist(checklist);
	}

	/** Information about the message that is being replied to, which may come from another chat or forum topic */
	@Inspect({ nullable: false })
	get externalReply() {
		const { external_reply } = this.payload;

		if (!external_reply) return undefined;

		return new ExternalReplyInfo(external_reply);
	}

	/** For replies that quote part of the original message, the quoted part of the message */
	@Inspect({ nullable: false })
	get quote() {
		const { quote } = this.payload;

		if (!quote) return undefined;

		return new TextQuote(quote);
	}

	/** Bot through which the message was sent */
	@Inspect({ nullable: false })
	get viaBot() {
		const { via_bot } = this.payload;

		if (!via_bot) return undefined;

		return new User(via_bot);
	}

	/** Date the message was last edited in Unix time */
	@Inspect({ nullable: false })
	get updatedAt() {
		return this.payload.edit_date;
	}

	/** `true`, if the message can't be forwarded */
	@Inspect({ compute: true, nullable: false })
	hasProtectedContent() {
		return this.payload.has_protected_content as true | undefined;
	}

	/** `true`, True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message */
	@Inspect({ compute: true, nullable: false })
	isFromOffline() {
		return this.payload.is_from_offline as true | undefined;
	}

	/** *Optional*. *True*, if the message is a paid post */
	@Inspect({ compute: true, nullable: false })
	isPaidPost() {
		return this.payload.is_paid_post as true | undefined;
	}

	/** The unique identifier of a media message group this message belongs to */
	@Inspect({ nullable: false })
	get mediaGroupId() {
		return this.payload.media_group_id;
	}

	/**
	 * Signature of the post author for messages in channels,
	 * or the custom title of an anonymous group administrator
	 */
	@Inspect({ nullable: false })
	get authorSignature() {
		return this.payload.author_signature;
	}

	/**
	 * *Optional*. The number of Telegram Stars that were paid by the sender of the message to send it
	 */
	@Inspect()
	get paidStarCount() {
		return this.payload.paid_star_count;
	}

	/**
	 * For text messages, the actual UTF-8 text of the message, 0-4096 characters
	 */
	@Inspect({ nullable: false })
	get text() {
		return this.payload.text;
	}

	/**
	 * For text messages, special entities like usernames, URLs, bot commands,
	 * etc. that appear in the text
	 */
	@Inspect({ nullable: false })
	get entities() {
		const { entities } = this.payload;

		if (!entities) return undefined;

		return entities.map((entity) => new MessageEntity(entity));
	}

	/** Options used for link preview generation for the message, if it is a text message and link preview options were changed */
	@Inspect({ nullable: false })
	get linkPreviewOptions() {
		const { link_preview_options } = this.payload;

		if (!link_preview_options) return undefined;

		return new LinkPreviewOptions(link_preview_options);
	}

	/** *Optional*. Information about suggested post parameters if the message is a suggested post */
	@Inspect({ nullable: false })
	get suggestedPostInfo() {
		const { suggested_post_info } = this.payload;

		if (!suggested_post_info) return undefined;

		return new SuggestedPostInfo(suggested_post_info);
	}

	/** Unique identifier of the message effect added to the message */
	@Inspect({ nullable: false })
	get effectId() {
		return this.payload.effect_id;
	}

	/**
	 * Message is an animation, information about the animation. For backward
	 * compatibility, when this field is set, the `document` field will also be set
	 */
	@Inspect({ nullable: false })
	get animation() {
		const { animation } = this.payload;

		if (!animation) return undefined;

		return new AnimationAttachment(animation);
	}

	/** Message is an audio file, information about the file */
	@Inspect({ nullable: false })
	get audio() {
		const { audio } = this.payload;

		if (!audio) return undefined;

		return new AudioAttachment(audio);
	}

	/** Message is a general file, information about the file */
	@Inspect({ nullable: false })
	get document() {
		const { document } = this.payload;

		if (!document) return undefined;

		return new DocumentAttachment(document);
	}

	/** Message is a photo, available sizes of the photo */
	@Inspect({ nullable: false })
	get photo() {
		const { photo } = this.payload;

		if (!photo) return undefined;

		return photo.map((size) => new PhotoSize(size));
	}

	/** Message is a sticker, information about the sticker */
	@Inspect({ nullable: false })
	get sticker() {
		const { sticker } = this.payload;

		if (!sticker) return undefined;

		return new StickerAttachment(sticker);
	}

	/** Message is a forwarded story */
	@Inspect({ nullable: false })
	get story() {
		const { story } = this.payload;

		if (!story) return undefined;

		return new StoryAttachment(story);
	}

	/** Message is a video, information about the video */
	@Inspect({ nullable: false })
	get video() {
		const { video } = this.payload;

		if (!video) return undefined;

		return new VideoAttachment(video);
	}

	/** Message is a video note, information about the video message */
	@Inspect({ nullable: false })
	get videoNote() {
		const { video_note } = this.payload;

		if (!video_note) return undefined;

		return new VideoNoteAttachment(video_note);
	}

	/** Message is a voice message, information about the file */
	@Inspect({ nullable: false })
	get voice() {
		const { voice } = this.payload;

		if (!voice) return undefined;

		return new VoiceAttachment(voice);
	}

	/**
	 * Caption for the animation, audio, document, photo, video or voice,
	 * 0-1024 characters
	 */
	@Inspect({ nullable: false })
	get caption() {
		return this.payload.caption;
	}

	/**
	 * For messages with a caption, special entities like usernames, URLs, bot
	 * commands, etc. that appear in the caption
	 */
	@Inspect({ nullable: false })
	get captionEntities() {
		const { caption_entities } = this.payload;

		if (!caption_entities) return undefined;

		return caption_entities.map((entity) => new MessageEntity(entity));
	}

	/**
	 * True, if the caption must be shown above the message media
	 */
	@Inspect({ compute: true, nullable: false })
	isShowCaptionAboveMedia() {
		return !!this.payload.show_caption_above_media;
	}

	/** `true`, if the message media is covered by a spoiler animation */
	@Inspect({ compute: true, nullable: false })
	hasMediaSpoiler() {
		return this.payload.has_media_spoiler as true | undefined;
	}

	/** Message is a shared contact, information about the contact */
	@Inspect({ nullable: false })
	get contact() {
		const { contact } = this.payload;

		if (!contact) return undefined;

		return new Contact(contact);
	}

	/** Message is a dice with random value from 1 to 6 */
	@Inspect({ nullable: false })
	get dice() {
		const { dice } = this.payload;

		if (!dice) return undefined;

		return new Dice(dice);
	}

	/** Message is a game, information about the game */
	@Inspect({ nullable: false })
	get game() {
		const { game } = this.payload;

		if (!game) return undefined;

		return new Game(game);
	}

	/** Message is a native poll, information about the poll */
	@Inspect({ nullable: false })
	get poll() {
		const { poll } = this.payload;

		if (!poll) return undefined;

		return new Poll(poll);
	}

	/**
	 * Message is a venue, information about the venue.
	 * For backward compatibility, when this field is set,
	 * the `location` field will also be set
	 */
	@Inspect({ nullable: false })
	get venue() {
		const { venue } = this.payload;

		if (!venue) return undefined;

		return new Venue(venue);
	}

	/** Message is a shared location, information about the location */
	@Inspect({ nullable: false })
	get location() {
		const { location } = this.payload;

		if (!location) return undefined;

		return new Location(location);
	}

	/**
	 * Inline keyboard attached to the message.
	 *
	 * `login_url` buttons are represented as ordinary `url` buttons.
	 */
	@Inspect({ nullable: false })
	get replyMarkup() {
		const { reply_markup } = this.payload;

		if (!reply_markup || !("inline_keyboard" in reply_markup)) return undefined;

		return new InlineKeyboardMarkup(reply_markup);
	}

	/** The domain name of the website on which the user has logged in. */
	@Inspect({ nullable: false })
	get connectedWebsite() {
		return this.payload.connected_website;
	}

	/** Telegram Passport data */
	@Inspect({ nullable: false })
	get passportData() {
		const { passport_data } = this.payload;

		if (!passport_data) return undefined;

		return new PassportData(passport_data);
	}

	// Events

	/**
	 * New members that were added to the group or supergroup and information
	 * about them (the bot itself may be one of these members)
	 */
	@Inspect({ nullable: false })
	get newChatMembers() {
		const { new_chat_members } = this.payload;

		if (!new_chat_members) return undefined;

		return new_chat_members.map((member) => new User(member));
	}

	/**
	 * A member was removed from the group, information about them (this member
	 * may be the bot itself)
	 */
	@Inspect({ nullable: false })
	get leftChatMember() {
		const { left_chat_member } = this.payload;

		if (!left_chat_member) return undefined;

		return new User(left_chat_member);
	}

	/** A chat title was changed to this value */
	@Inspect({ nullable: false })
	get newChatTitle() {
		return this.payload.new_chat_title;
	}

	/** A chat photo was change to this value */
	@Inspect({ nullable: false })
	get newChatPhoto() {
		const { new_chat_photo } = this.payload;

		if (!new_chat_photo) return undefined;

		return new_chat_photo.map((size) => new PhotoSize(size));
	}

	/** Service message: the chat photo was deleted */
	@Inspect({ nullable: false })
	get deleteChatPhoto() {
		return this.payload.delete_chat_photo;
	}

	/** Service message: the group has been created */
	@Inspect({ nullable: false })
	get groupChatCreated() {
		return this.payload.group_chat_created;
	}

	/**
	 * Service message: the supergroup has been created. This field can't be
	 * received in a message coming through updates, because bot can't be a
	 * member of a supergroup when it is created. It can only be found in
	 * `replyMessage` if someone replies to a very first message in a
	 * directly created supergroup.
	 */
	@Inspect({ nullable: false })
	get supergroupChatCreated() {
		return this.payload.supergroup_chat_created;
	}

	/** Service message: auto-delete timer settings changed in the chat */
	@Inspect({ nullable: false })
	get messageAutoDeleteTimerChanged() {
		const { message_auto_delete_timer_changed } = this.payload;

		if (!message_auto_delete_timer_changed) return undefined;

		return new MessageAutoDeleteTimerChanged(message_auto_delete_timer_changed);
	}

	/**
	 * Service message: the channel has been created. This field can't be
	 * received in a message coming through updates, because bot can't be a
	 * member of a channel when it is created. It can only be found in
	 * `replyMessage` if someone replies to a very first message in a channel.
	 */
	@Inspect({ nullable: false })
	get channelChatCreated() {
		return this.payload.channel_chat_created;
	}

	/**
	 * The group has been migrated to a supergroup with the specified identifier.
	 * This number may be greater than 32 bits and some programming languages may
	 * have difficulty/silent defects in interpreting it. But it is smaller than
	 * 52 bits, so a signed 64 bit integer or double-precision float type are
	 * safe for storing this identifier.
	 */
	@Inspect({ nullable: false })
	get migrateToChatId() {
		return this.payload.migrate_to_chat_id;
	}

	/**
	 * The supergroup has been migrated from a group with the specified
	 * identifier. This number may be greater than 32 bits and some programming
	 * languages may have difficulty/silent defects in interpreting it. But it is
	 * smaller than 52 bits, so a signed 64 bit integer or double-precision float
	 * type are safe for storing this identifier.
	 */
	@Inspect({ nullable: false })
	get migrateFromChatId() {
		return this.payload.migrate_from_chat_id;
	}

	/**
	 * Specified message was pinned. Note that the Message object in this field
	 * will not contain further `replyMessage` fields even if it is itself a
	 * reply.
	 */
	@Inspect({ nullable: false })
	get pinnedMessage():
		| InaccessibleMessage
		| Omit<Message, "replyMessage">
		| undefined {
		const { pinned_message } = this.payload;

		if (!pinned_message) return undefined;

		if (pinned_message.date === 0) {
			return new InaccessibleMessage(pinned_message);
		}

		return new Message(pinned_message);
	}

	/** Message is an invoice for a payment, information about the invoice */
	@Inspect({ nullable: false })
	get invoice() {
		const { invoice } = this.payload;

		if (!invoice) return undefined;

		return new Invoice(invoice);
	}

	/**
	 * Message is a service message about a successful payment,
	 * information about the payment.
	 */
	@Inspect({ nullable: false })
	get successfulPayment() {
		const { successful_payment } = this.payload;

		if (!successful_payment) return undefined;

		return new SuccessfulPayment(successful_payment);
	}

	/** Service message: a user was shared with the bot */
	@Inspect({ nullable: false })
	get usersShared() {
		const { users_shared } = this.payload;

		if (!users_shared) return undefined;

		return new UsersShared(users_shared);
	}

	/** Service message: a chat was shared with the bot */
	@Inspect({ nullable: false })
	get chatShared() {
		const { chat_shared } = this.payload;

		if (!chat_shared) return undefined;

		return new ChatShared(chat_shared);
	}

	/** Service message: a gift was sent to the chat */
	@Inspect({ nullable: false })
	get gift() {
		const { gift } = this.payload;

		if (!gift) return undefined;

		return new GiftInfo(gift);
	}

	/** Service message: upgrade of a gift was purchased after the gift was sent */
	@Inspect({ nullable: false })
	get giftUpgradeSent() {
		const { gift_upgrade_sent } = this.payload;

		if (!gift_upgrade_sent) return undefined;

		return new GiftInfo(gift_upgrade_sent);
	}

	/** Service message: a unique gift was sent to the chat */
	@Inspect({ nullable: false })
	get uniqueGift() {
		const { unique_gift } = this.payload;

		if (!unique_gift) return undefined;

		return new UniqueGiftInfo(unique_gift);
	}

	/**
	 * Service message.
	 * A user in the chat triggered another user's proximity alert
	 * while sharing Live Location.
	 */
	@Inspect({ nullable: false })
	get proximityAlertTriggered() {
		const { proximity_alert_triggered } = this.payload;

		if (!proximity_alert_triggered) return undefined;

		return new ProximityAlertTriggered(proximity_alert_triggered);
	}

	/** Service message: the user allowed the bot added to the attachment menu to write messages */
	@Inspect({ nullable: false })
	get writeAccessAllowed() {
		const { write_access_allowed } = this.payload;

		if (!write_access_allowed) return undefined;

		return new WriteAccessAllowed(write_access_allowed);
	}

	/** Service message: chat boost added */
	@Inspect({ nullable: false })
	get chatBoostAdded() {
		const { boost_added } = this.payload;

		if (!boost_added) return undefined;

		return new ChatBoostAdded(boost_added);
	}

	/** Service message: chat background set */
	@Inspect({ nullable: false })
	get chatBackgroundSet() {
		const { chat_background_set } = this.payload;

		if (!chat_background_set) return undefined;

		return new ChatBackground(chat_background_set);
	}

	/** Service message: checklist tasks done */
	@Inspect({ nullable: false })
	get checklistTasksDone() {
		const { checklist_tasks_done } = this.payload;

		if (!checklist_tasks_done) return undefined;

		return new ChecklistTasksDone(checklist_tasks_done);
	}

	/** Service message: checklist tasks added */

	/** Service message: checklist tasks added */
	@Inspect({ nullable: false })
	get checklistTasksAdded() {
		const { checklist_tasks_added } = this.payload;

		if (!checklist_tasks_added) return undefined;

		return new ChecklistTasksAdded(checklist_tasks_added);
	}

	/** Service message: direct message price changed */
	@Inspect({ nullable: false })
	get directMessagePriceChanged() {
		const { direct_message_price_changed } = this.payload;

		if (!direct_message_price_changed) return undefined;

		return new DirectMessagePriceChanged(direct_message_price_changed);
	}

	/** Service message: a suggested post was approved */
	@Inspect({ nullable: false })
	get suggestedPostApproved() {
		const { suggested_post_approved } = this.payload;

		if (!suggested_post_approved) return undefined;

		return new SuggestedPostApproved(suggested_post_approved);
	}

	/** Service message: approval of a suggested post has failed */
	@Inspect({ nullable: false })
	get suggestedPostApprovalFailed() {
		const { suggested_post_approval_failed } = this.payload;

		if (!suggested_post_approval_failed) return undefined;

		return new SuggestedPostApprovalFailed(suggested_post_approval_failed);
	}

	/** Service message: a suggested post was declined */
	@Inspect({ nullable: false })
	get suggestedPostDeclined() {
		const { suggested_post_declined } = this.payload;

		if (!suggested_post_declined) return undefined;

		return new SuggestedPostDeclined(suggested_post_declined);
	}

	/** Service message: payment for a suggested post was received */
	@Inspect({ nullable: false })
	get suggestedPostPaid() {
		const { suggested_post_paid } = this.payload;

		if (!suggested_post_paid) return undefined;

		return new SuggestedPostPaid(suggested_post_paid);
	}

	/** Service message: payment for a suggested post was refunded */
	@Inspect({ nullable: false })
	get suggestedPostRefunded() {
		const { suggested_post_refunded } = this.payload;

		if (!suggested_post_refunded) return undefined;

		return new SuggestedPostRefunded(suggested_post_refunded);
	}

	/** Service message: forum topic created */
	@Inspect({ nullable: false })
	get forumTopicCreated() {
		const { forum_topic_created } = this.payload;

		if (!forum_topic_created) return undefined;

		return new ForumTopicCreated(forum_topic_created);
	}

	/** Service message: forum topic edited */
	@Inspect({ nullable: false })
	get forumTopicEdited() {
		const { forum_topic_edited } = this.payload;

		if (!forum_topic_edited) return undefined;

		return new ForumTopicEdited(forum_topic_edited);
	}

	/** Service message: forum topic closed */
	@Inspect({ nullable: false })
	get forumTopicClosed() {
		const { forum_topic_closed } = this.payload;

		if (!forum_topic_closed) return undefined;
		return new ForumTopicClosed(forum_topic_closed);
	}

	/** Service message: forum topic reopened */
	@Inspect({ nullable: false })
	get forumTopicReopened() {
		const { forum_topic_reopened } = this.payload;

		if (!forum_topic_reopened) return undefined;

		return new ForumTopicReopened(forum_topic_reopened);
	}

	/** Service message: the 'General' forum topic hidden */
	@Inspect({ nullable: false })
	get generalForumTopicHidden() {
		const { general_forum_topic_hidden } = this.payload;

		if (!general_forum_topic_hidden) return undefined;

		return new GeneralForumTopicHidden(general_forum_topic_hidden);
	}

	/** Service message: the 'General' forum topic unhidden */
	@Inspect({ nullable: false })
	get generalForumTopicUnhidden() {
		const { general_forum_topic_unhidden } = this.payload;

		if (!general_forum_topic_unhidden) return undefined;

		return new GeneralForumTopicUnhidden(general_forum_topic_unhidden);
	}

	/** The message is a scheduled giveaway message */
	@Inspect({ nullable: false })
	get giveaway() {
		const { giveaway } = this.payload;

		if (!giveaway) return undefined;

		return new Giveaway(giveaway);
	}

	/** Service message: a scheduled giveaway was created */
	@Inspect({ nullable: false })
	get giveawayCreated() {
		const { giveaway_created } = this.payload;

		if (!giveaway_created) return undefined;

		return new GiveawayCreated(giveaway_created);
	}

	/** Service message: a giveaway without public winners was completed */
	@Inspect({ nullable: false })
	get giveawayCompleted() {
		const { giveaway_completed } = this.payload;

		if (!giveaway_completed) return undefined;

		return new GiveawayCompleted(giveaway_completed);
	}

	/** A giveaway with public winners was completed */
	@Inspect({ nullable: false })
	get giveawayWinners() {
		const { giveaway_winners } = this.payload;

		if (!giveaway_winners) return undefined;

		return new GiveawayWinners(giveaway_winners);
	}

	/** Service message: video chat scheduled */
	@Inspect({ nullable: false })
	get videoChatScheduled() {
		const { video_chat_scheduled } = this.payload;

		if (!video_chat_scheduled) return undefined;

		return new VideoChatScheduled(video_chat_scheduled);
	}

	/** Service message: video chat started */
	@Inspect({ nullable: false })
	get videoChatStarted() {
		const { video_chat_started } = this.payload;

		if (!video_chat_started) return undefined;

		return new VideoChatStarted(video_chat_started);
	}

	/** Service message: video chat ended */
	@Inspect({ nullable: false })
	get videoChatEnded() {
		const { video_chat_ended } = this.payload;

		if (!video_chat_ended) return undefined;

		return new VideoChatEnded(video_chat_ended);
	}

	/** Service message: new participants invited to a video chat */
	@Inspect({ nullable: false })
	get videoChatParticipantsInvited() {
		const { video_chat_participants_invited } = this.payload;

		if (!video_chat_participants_invited) return undefined;

		return new VideoChatParticipantsInvited(video_chat_participants_invited);
	}

	/** Service message: data sent by a Web App */
	@Inspect({ nullable: false })
	get webAppData() {
		const { web_app_data } = this.payload;

		if (!web_app_data) return undefined;

		return new WebAppData(web_app_data);
	}
}

memoizeGetters(Message, [
	"from",
	"senderChat",
	"chat",
	"directMessagesTopic",
	"forwardOrigin",
	"replyMessage",
	"externalReply",
	"quote",
	"viaBot",
	"entities",
	"linkPreviewOptions",
	"suggestedPostInfo",
	"animation",
	"audio",
	"document",
	"sticker",
	"story",
	"video",
	"videoNote",
	"voice",
	"captionEntities",
	"contact",
	"dice",
	"game",
	"poll",
	"venue",
	"location",
	"replyMarkup",
	"passportData",
	"newChatMembers",
	"leftChatMember",
	"newChatPhoto",
	"messageAutoDeleteTimerChanged",
	"pinnedMessage",
	"invoice",
	"successfulPayment",
	"usersShared",
	"chatShared",
	"giftUpgradeSent",
	"proximityAlertTriggered",
	"writeAccessAllowed",
	"suggestedPostApproved",
	"suggestedPostApprovalFailed",
	"suggestedPostDeclined",
	"suggestedPostPaid",
	"suggestedPostRefunded",
	"forumTopicClosed",
	"forumTopicCreated",
	"forumTopicEdited",
	"forumTopicReopened",
	"generalForumTopicHidden",
	"generalForumTopicUnhidden",
	"giveaway",
	"giveawayCompleted",
	"giveawayCreated",
	"giveawayWinners",
	"videoChatEnded",
	"videoChatParticipantsInvited",
	"videoChatScheduled",
	"videoChatStarted",
	"webAppData",
]);
