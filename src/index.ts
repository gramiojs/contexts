/**
 * @module
 *
 * Contexts for GramIO framework
 */

// INFO: Temp polyfill, more info https://github.com/microsoft/TypeScript/issues/55453#issuecomment-1687496648
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export * from "./contexts";
export * from "./structures";
export * from "./utils";
export * from "./types";

import * as Contexts from "./contexts";
import type { BotLike, ContextsMapping, MessageEventName } from "./types";

export const contextsMappings: { callback_query: any; chat_join_request: any; chat_member: any; my_chat_member: any; chosen_inline_result: any; delete_chat_photo: any; group_chat_created: any; inline_query: any; invoice: any; left_chat_member: any; location: any; message_auto_delete_timer_changed: any; message: any; channel_post: any; edited_message: any; edited_channel_post: any; business_message: any; edited_business_message: any; deleted_business_messages: any; business_connection: any; migrate_from_chat_id: any; migrate_to_chat_id: any; new_chat_members: any; new_chat_photo: any; new_chat_title: any; passport_data: any; pinned_message: any; poll_answer: any; poll: any; pre_checkout_query: any; proximity_alert_triggered: any; write_access_allowed: any; boost_added: any; chat_background_set: any; forum_topic_created: any; forum_topic_edited: any; forum_topic_closed: any; forum_topic_reopened: any; general_forum_topic_hidden: any; general_forum_topic_unhidden: any; shipping_query: any; successful_payment: any; users_shared: any; chat_shared: any; video_chat_ended: any; video_chat_participants_invited: any; video_chat_scheduled: any; video_chat_started: any; web_app_data: any; service_message: any; message_reaction: any; message_reaction_count: any; chat_boost: any; removed_chat_boost: any; giveaway_created: any; giveaway_completed: any; giveaway_winners: any; } = {
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
	business_message: Contexts.MessageContext,
	edited_business_message: Contexts.MessageContext,
	deleted_business_messages: Contexts.BusinessMessagesDeletedContext,
	business_connection: Contexts.BusinessConnectionContext,
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
	chat_background_set: Contexts.ChatBackgroundSetContext,
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
} satisfies Record<
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	keyof ContextsMapping<any> | MessageEventName,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	any
>;
