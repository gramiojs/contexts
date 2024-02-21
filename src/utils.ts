import type { Message } from "#structures";

import { MessageEventName } from "#types";
import * as Contexts from "./contexts";

export function memoizeGetters<T>(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	cls: new (...args: any[]) => T,
	fields: (keyof T)[],
) {
	for (const field of fields) {
		const desc = Object.getOwnPropertyDescriptor(cls.prototype, field);
		if (!desc) continue;

		const { get } = desc;

		if (!get) continue;

		Object.defineProperty(cls.prototype, field, {
			get() {
				const val = get.call(this);
				Object.defineProperty(this, field, {
					value: val,
					enumerable: true,
					writable: true,
				});

				return val;
			},
			enumerable: true,
			configurable: true,
		});
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const applyMixins = (derivedCtor: any, baseCtors: any[]) => {
	for (const baseCtor of baseCtors) {
		for (const name of Object.getOwnPropertyNames(baseCtor.prototype)) {
			if (name === "constructor") {
				continue;
			}

			if (
				Object.getOwnPropertyDescriptor(derivedCtor.prototype, name) ===
				undefined
			) {
				Object.defineProperty(
					derivedCtor.prototype,
					name,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!,
				);
			}
		}
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isPlainObject = (object: object): object is Record<string, any> =>
	Object.prototype.toString.call(object) === "[object Object]";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const filterPayload = (payload: Record<string, any>) => {
	const filteredPayload: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(payload)) {
		const notEmpty = value !== undefined && value !== null;

		const isEmptyArray = Array.isArray(value) && value?.length === 0;

		if (notEmpty && !isEmptyArray) {
			if (isPlainObject(value)) {
				filteredPayload[key] = filterPayload(value);
			} else {
				filteredPayload[key] = value;
			}
		}
	}

	return filteredPayload;
};

export const isParsable = (source: string) => {
	try {
		JSON.parse(source);
	} catch (e) {
		return false;
	}

	return true;
};

export const contextsMappings = {
	callback_query: Contexts.CallbackQueryContext,
	chat_join_request: Contexts.ChatJoinRequestContext,
	chat_member: Contexts.ChatMemberContext,
	my_chat_member: Contexts.ChatMemberContext,
	chosen_inline_result: Contexts.ChosenInlineResultContext,
	delete_chat_photo: Contexts.DeleteChatPhotoContext,
	group_chat_created: Contexts.GroupChatCreatedContext,
	inline_query: Contexts.InlineQueryContext,
	invoice: Contexts.InvoiceContext,
	left_chat_member: Contexts.LeftChatMemberContext,
	location: Contexts.LocationContext,
	message_auto_delete_timer_changed:
		Contexts.MessageAutoDeleteTimerChangedContext,
	message: Contexts.MessageContext,
	channel_post: Contexts.MessageContext,
	edited_message: Contexts.MessageContext,
	edited_channel_post: Contexts.MessageContext,
	migrate_from_chat_id: Contexts.MigrateFromChatIdContext,
	migrate_to_chat_id: Contexts.MigrateToChatIdContext,
	new_chat_members: Contexts.NewChatMembersContext,
	new_chat_photo: Contexts.NewChatPhotoContext,
	new_chat_title: Contexts.NewChatTitleContext,
	passport_data: Contexts.PassportDataContext,
	pinned_message: Contexts.PinnedMessageContext,
	poll_answer: Contexts.PollAnswerContext,
	poll: Contexts.PollContext,
	pre_checkout_query: Contexts.PreCheckoutQueryContext,
	proximity_alert_triggered: Contexts.ProximityAlertTriggeredContext,
	write_access_allowed: Contexts.WriteAccessAllowedContext,
	boost_added: Contexts.BoostAddedContext,
	forum_topic_created: Contexts.ForumTopicCreatedContext,
	forum_topic_edited: Contexts.ForumTopicEditedContext,
	forum_topic_closed: Contexts.ForumTopicClosedContext,
	forum_topic_reopened: Contexts.ForumTopicReopenedContext,
	general_forum_topic_hidden: Contexts.GeneralForumTopicHiddenContext,
	general_forum_topic_unhidden: Contexts.GeneralForumTopicUnhiddenContext,
	shipping_query: Contexts.ShippingQueryContext,
	successful_payment: Contexts.SuccessfulPaymentContext,
	users_shared: Contexts.UsersSharedContext,
	chat_shared: Contexts.ChatSharedContext,
	video_chat_ended: Contexts.VideoChatEndedContext,
	video_chat_participants_invited: Contexts.VideoChatParticipantsInvitedContext,
	video_chat_scheduled: Contexts.VideoChatScheduledContext,
	video_chat_started: Contexts.VideoChatStartedContext,
	web_app_data: Contexts.WebAppDataContext,
	service_message: Contexts.MessageContext,

	message_reaction: Contexts.MessageReactionContext,
	message_reaction_count: Contexts.MessageReactionCountContext,
	chat_boost: Contexts.ChatBoostContext,
	removed_chat_boost: Contexts.RemovedChatBoostContext,
	giveaway_created: Contexts.GiveawayCreatedContext,
	giveaway_completed: Contexts.GiveawayCompletedContext,
	giveaway_winners: Contexts.GiveawayWinnersContext,
};

export const SERVICE_MESSAGE_EVENTS: MessageEventName[] = [
	"new_chat_members",
	"left_chat_member",
	"new_chat_title",
	"new_chat_photo",
	"delete_chat_photo",
	"group_chat_created",
	"message_auto_delete_timer_changed",
	"users_shared",
	"chat_shared",
	"write_access_allowed",
	"forum_topic_closed",
	"forum_topic_created",
	"forum_topic_edited",
	"forum_topic_reopened",
	"general_forum_topic_hidden",
	"general_forum_topic_unhidden",
	"video_chat_scheduled",
	"video_chat_started",
	"video_chat_ended",
	"video_chat_participants_invited",
	"web_app_data",
	"giveaway_created",
	"giveaway_completed",

	"migrate_from_chat_id",
	"migrate_to_chat_id",
	"pinned_message",
	"successful_payment",
	"proximity_alert_triggered",
	// passport_data?
	"boost_added",
];

export const EVENTS: [keyof Message, MessageEventName][] = [
	["newChatMembers", "new_chat_members"],
	["leftChatMember", "left_chat_member"],
	["newChatTitle", "new_chat_title"],
	["newChatPhoto", "new_chat_photo"],
	["deleteChatPhoto", "delete_chat_photo"],
	["groupChatCreated", "group_chat_created"],
	["messageAutoDeleteTimerChanged", "message_auto_delete_timer_changed"],
	["migrateToChatId", "migrate_to_chat_id"],
	["migrateFromChatId", "migrate_from_chat_id"],
	["pinnedMessage", "pinned_message"],
	["invoice", "invoice"],
	["successfulPayment", "successful_payment"],
	["usersShared", "users_shared"],
	["chatShared", "chat_shared"],
	["proximityAlertTriggered", "proximity_alert_triggered"],
	["writeAccessAllowed", "write_access_allowed"],
	["chatBoostAdded", "boost_added"],
	["forumTopicCreated", "forum_topic_created"],
	["forumTopicEdited", "forum_topic_edited"],
	["forumTopicClosed", "forum_topic_closed"],
	["forumTopicReopened", "forum_topic_reopened"],
	["generalForumTopicHidden", "general_forum_topic_hidden"],
	["generalForumTopicUnhidden", "general_forum_topic_unhidden"],
	["videoChatScheduled", "video_chat_scheduled"],
	["videoChatStarted", "video_chat_started"],
	["videoChatEnded", "video_chat_ended"],
	["videoChatParticipantsInvited", "video_chat_participants_invited"],
	["webAppData", "web_app_data"],
	["location", "location"],
	["passportData", "passport_data"],
	["giveawayCreated", "giveaway_created"],
	["giveawayCompleted", "giveaway_completed"],
	["giveawayWinners", "giveaway_winners"],
];
