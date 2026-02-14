import type { Message } from "./structures/index";

import type { MessageEventName } from "./types";

/** Helper for getters memoization */
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

/** Helper for construct mixins */
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

/** Guard to check is it play object */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isPlainObject = (object: object): object is Record<string, any> =>
	Object.prototype.toString.call(object) === "[object Object]";

/** Helper for filter objects */
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

/** Guard to check is string can be parsed via {@link JSON.parse} */
export const isParsable = (source: string) => {
	try {
		JSON.parse(source);
	} catch (e) {
		return false;
	}

	return true;
};

/** Array of SERVICE_MESSAGE_EVENTS */
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
	"unique_gift",
	"gift",
	"gift_upgrade_sent",
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
	"chat_background_set",
	"checklist_tasks_done",
	"checklist_tasks_added",
	"direct_message_price_changed",
	"suggested_post_approved",
	"suggested_post_approval_failed",
	"suggested_post_declined",
	"suggested_post_paid",
	"suggested_post_refunded",
];

/** Array of EVENTS */
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
	["gift", "gift"],
	["giftUpgradeSent", "gift_upgrade_sent"],
	["uniqueGift", "unique_gift"],
	["proximityAlertTriggered", "proximity_alert_triggered"],
	["writeAccessAllowed", "write_access_allowed"],
	["chatBoostAdded", "boost_added"],
	["chatBackgroundSet", "chat_background_set"],
	["checklistTasksDone", "checklist_tasks_done"],
	["checklistTasksAdded", "checklist_tasks_added"],
	["directMessagePriceChanged", "direct_message_price_changed"],
	["suggestedPostApproved", "suggested_post_approved"],
	["suggestedPostApprovalFailed", "suggested_post_approval_failed"],
	["suggestedPostDeclined", "suggested_post_declined"],
	["suggestedPostPaid", "suggested_post_paid"],
	["suggestedPostRefunded", "suggested_post_refunded"],
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
