/**
 * @module
 *
 * Contexts for GramIO framework
 */

// INFO: Temp polyfill, more info https://github.com/microsoft/TypeScript/issues/55453#issuecomment-1687496648
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export * from "./contexts/index";
export * from "./structures/index";
export * from "./utils";
export * from "./types";

import * as Contexts from "./contexts/index";
import type { BotLike, ContextsMapping, MessageEventName } from "./types";

/**
 * Mapping UpdateNames to their contexts
 *
 * @example
 * ```typescript
 * contextMappings["message"] is MessageContext
 * ```
 *
 *  */
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
    refunded_payment: Contexts.RefundedPaymentContext,
    users_shared: Contexts.UsersSharedContext,
    chat_shared: Contexts.ChatSharedContext,
    video_chat_ended: Contexts.VideoChatEndedContext,
    video_chat_participants_invited:
        Contexts.VideoChatParticipantsInvitedContext,
    video_chat_scheduled: Contexts.VideoChatScheduledContext,
    video_chat_started: Contexts.VideoChatStartedContext,
    web_app_data: Contexts.WebAppDataContext,
    service_message: Contexts.MessageContext,
    purchased_paid_media: Contexts.PaidMediaPurchasedContext,
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
