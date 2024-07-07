import type {
	APIMethodParams,
	APIMethodReturn,
	APIMethods,
	TelegramInputMedia,
	TelegramParams,
	TelegramResponseParameters,
	TelegramUpdate,
} from "@gramio/types";

import type * as Contexts from "./contexts/index";
import type * as Attachments from "./structures/attachments/index";

interface Suppress<IsSuppressed extends boolean | undefined = undefined> {
	/**
	 * Pass `true` if you want to suppress throwing errors of this method.
	 *
	 * **But this does not undo getting into the `onResponseError` hook**.
	 *
	 * @example
	 * ```ts
	 * const response = await bot.api.sendMessage({
	 * 		suppress: true,
	 * 		chat_id: "@not_found",
	 * 		text: "Suppressed method"
	 * });
	 *
	 * if(response instanceof TelegramError) console.error("sendMessage returns an error...")
	 * else console.log("Message has been sent successfully");
	 * ```
	 *
	 * */
	suppress?: IsSuppressed;
}

type SuppressedParams<
	Method extends keyof APIMethods,
	IsSuppressed extends boolean | undefined = undefined,
> = APIMethodParams<Method> & Suppress<IsSuppressed>;

interface TelegramError<T extends keyof APIMethods> extends Error {
	method: T;
	params: APIMethodParams<T>;
	code: number;
	payload?: TelegramResponseParameters;
}

type SuppressedReturn<
	Method extends keyof APIMethods,
	IsSuppressed extends boolean | undefined = undefined,
> = true extends IsSuppressed
	? TelegramError<Method> | APIMethodReturn<Method>
	: APIMethodReturn<Method>;

type SuppressedAPIMethods<Methods extends keyof APIMethods = keyof APIMethods> =
	{
		[APIMethod in Methods]: APIMethodParams<APIMethod> extends undefined
			? <IsSuppressed extends boolean | undefined = undefined>(
					params?: Suppress<IsSuppressed>,
				) => Promise<SuppressedReturn<APIMethod, IsSuppressed>>
			: undefined extends APIMethodParams<APIMethod>
				? <IsSuppressed extends boolean | undefined = undefined>(
						params?: SuppressedParams<APIMethod, IsSuppressed>,
					) => Promise<SuppressedReturn<APIMethod, IsSuppressed>>
				: <IsSuppressed extends boolean | undefined = undefined>(
						params: SuppressedParams<APIMethod, IsSuppressed>,
					) => Promise<SuppressedReturn<APIMethod, IsSuppressed>>;
	};

/** The required object that the contexts are based on */
export interface BotLike {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	__Derives?: Record<UpdateName | "global", {}>;
	api: SuppressedAPIMethods;
	downloadFile(
		attachment:
			| Attachments.Attachment
			| {
					file_id: string;
			  }
			| string,
	): Promise<ArrayBuffer>;
	downloadFile(
		attachment:
			| Attachments.Attachment
			| {
					file_id: string;
			  }
			| string,
		path: string,
	): Promise<string>;
}

/** Mapping events to their contexts */
export type ContextsMapping<Bot extends BotLike> = {
	callback_query: Contexts.CallbackQueryContext<Bot>;
	chat_join_request: Contexts.ChatJoinRequestContext<Bot>;
	chat_member: Contexts.ChatMemberContext<Bot>;
	my_chat_member: Contexts.ChatMemberContext<Bot>;
	chosen_inline_result: Contexts.ChosenInlineResultContext<Bot>;
	delete_chat_photo: Contexts.DeleteChatPhotoContext<Bot>;
	group_chat_created: Contexts.GroupChatCreatedContext<Bot>;
	inline_query: Contexts.InlineQueryContext<Bot>;
	invoice: Contexts.InvoiceContext<Bot>;
	left_chat_member: Contexts.LeftChatMemberContext<Bot>;
	location: Contexts.LocationContext<Bot>;
	message_auto_delete_timer_changed: Contexts.MessageAutoDeleteTimerChangedContext<Bot>;
	message: Contexts.MessageContext<Bot>;
	channel_post: Contexts.MessageContext<Bot>;
	edited_message: Contexts.MessageContext<Bot>;
	edited_channel_post: Contexts.MessageContext<Bot>;
	business_message: Contexts.MessageContext<Bot>;
	edited_business_message: Contexts.MessageContext<Bot>;
	deleted_business_messages: Contexts.BusinessMessagesDeletedContext<Bot>;
	business_connection: Contexts.BusinessConnectionContext<Bot>;
	migrate_from_chat_id: Contexts.MigrateFromChatIdContext<Bot>;
	migrate_to_chat_id: Contexts.MigrateToChatIdContext<Bot>;
	new_chat_members: Contexts.NewChatMembersContext<Bot>;
	new_chat_photo: Contexts.NewChatPhotoContext<Bot>;
	new_chat_title: Contexts.NewChatTitleContext<Bot>;
	passport_data: Contexts.PassportDataContext<Bot>;
	pinned_message: Contexts.PinnedMessageContext<Bot>;
	poll_answer: Contexts.PollAnswerContext<Bot>;
	poll: Contexts.PollContext<Bot>;
	pre_checkout_query: Contexts.PreCheckoutQueryContext<Bot>;
	proximity_alert_triggered: Contexts.ProximityAlertTriggeredContext<Bot>;
	write_access_allowed: Contexts.WriteAccessAllowedContext<Bot>;
	boost_added: Contexts.BoostAddedContext<Bot>;
	chat_background_set: Contexts.ChatBackgroundSetContext<Bot>;
	forum_topic_created: Contexts.ForumTopicCreatedContext<Bot>;
	forum_topic_edited: Contexts.ForumTopicEditedContext<Bot>;
	forum_topic_closed: Contexts.ForumTopicClosedContext<Bot>;
	forum_topic_reopened: Contexts.ForumTopicReopenedContext<Bot>;
	general_forum_topic_hidden: Contexts.GeneralForumTopicHiddenContext<Bot>;
	general_forum_topic_unhidden: Contexts.GeneralForumTopicUnhiddenContext<Bot>;
	shipping_query: Contexts.ShippingQueryContext<Bot>;
	successful_payment: Contexts.SuccessfulPaymentContext<Bot>;
	refunded_payment: Contexts.RefundedPaymentContext<Bot>;
	users_shared: Contexts.UsersSharedContext<Bot>;
	chat_shared: Contexts.ChatSharedContext<Bot>;
	video_chat_ended: Contexts.VideoChatEndedContext<Bot>;
	video_chat_participants_invited: Contexts.VideoChatParticipantsInvitedContext<Bot>;
	video_chat_scheduled: Contexts.VideoChatScheduledContext<Bot>;
	video_chat_started: Contexts.VideoChatStartedContext<Bot>;
	web_app_data: Contexts.WebAppDataContext<Bot>;
	service_message: Contexts.MessageContext<Bot>;
	message_reaction: Contexts.MessageReactionContext<Bot>;
	message_reaction_count: Contexts.MessageReactionCountContext<Bot>;
	chat_boost: Contexts.ChatBoostContext<Bot>;
	removed_chat_boost: Contexts.RemovedChatBoostContext<Bot>;
	giveaway_created: Contexts.GiveawayCreatedContext<Bot>;
	giveaway_completed: Contexts.GiveawayCompletedContext<Bot>;
	giveaway_winners: Contexts.GiveawayWinnersContext<Bot>;
};

/**
 * Type util to get type of Context
 *
 * @example
 * ```ts
 * type Message = ContextType<Bot, "message">;
 * ```
 *
 *  */
export type ContextType<
	Bot extends BotLike,
	Name extends keyof ContextsMapping<Bot>,
> = InstanceType<ContextsMapping<Bot>[Name]>;

/** Union type of MessageEvent names */
export type MessageEventName =
	| "new_chat_members"
	| "left_chat_member"
	| "new_chat_title"
	| "new_chat_photo"
	| "delete_chat_photo"
	| "group_chat_created"
	| "message_auto_delete_timer_changed"
	| "migrate_to_chat_id"
	| "migrate_from_chat_id"
	| "pinned_message"
	| "invoice"
	| "successful_payment"
	| "refunded_payment"
	| "users_shared"
	| "chat_shared"
	| "proximity_alert_triggered"
	| "write_access_allowed"
	| "forum_topic_created"
	| "forum_topic_edited"
	| "forum_topic_closed"
	| "forum_topic_reopened"
	| "general_forum_topic_hidden"
	| "general_forum_topic_unhidden"
	| "video_chat_scheduled"
	| "video_chat_started"
	| "video_chat_ended"
	| "video_chat_participants_invited"
	| "web_app_data"
	| "location"
	| "passport_data"
	| "giveaway_created"
	| "giveaway_completed"
	| "giveaway_winners"
	| "boost_added"
	| "chat_background_set";
// | "removed_chat_boost";

/** Custom Event Name */
export type CustomEventName = "service_message";
/** Union type of Update names */
export type UpdateName =
	| Exclude<keyof TelegramUpdate, "update_id">
	| MessageEventName
	| CustomEventName;

/** Type helper to join union type */
export type JoinUnion<T> = T extends infer U
	? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
		U extends any
		? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
			Record<string, any> & U
		: never
	: never;

/** Type helper to add array and non-array type */
export type MaybeArray<T> = T | T[];

/** Union type of attachments type */
export type AttachmentType =
	| TelegramInputMedia["type"]
	| "sticker"
	| "video_note"
	| "voice"
	| "contact"
	| "poll"
	| "venue"
	| "location"
	| "story";

/** Permits `string` but gives hints */
export type SoftString<S extends string> = (string & {}) | S;

/** Like `Required<T>` but for specified keys of `T` */
export type Require<O, K extends keyof O> = { [P in K]-?: NonNullable<O[P]> };

/** Type helper constructor */
// biome-ignore lint/complexity/noBannedTypes: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Constructor<T = {}> = new (...args: any[]) => T;

/** Like `Require<O, K>` but it sets `V` as the value for `K` values */
export type RequireValue<O, K extends keyof O, V> = Omit<O, K> & {
	[P in K]-?: V;
};

/** Make some keys optional */
export type Optional<
	T,
	K extends keyof T,
> = /** We pick every field but `K` and leave them as is */
Pick<
	T,
	Exclude<keyof T, K>
> /** Then, we take our `K` fields and mark them as optional */ & {
	[P in K]?: T[P];
} /** Lastly, we add `[key: string]: any;` */ /** Lastly, we add `[key: string]: any;` */ & {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
};

/** Type util to make chat_id optional and add type property */
type id<T, I extends { chat_id: string | number }> = { type: T } & Optional<
	I,
	"chat_id"
>;

/** This type represent SendAnimationParams and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendAnimation = id<
	"animation",
	TelegramParams.SendAnimationParams
>;
/** This type represent SendAudioParams and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendAudio = id<"audio", TelegramParams.SendAudioParams>;
/** This type represent SendDocumentParams and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendDocument = id<"document", TelegramParams.SendDocumentParams>;
/** This type represent SendPhotoParams and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendPhoto = id<"photo", TelegramParams.SendPhotoParams>;
/** This type represent SendStickerParams and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendSticker = id<"sticker", TelegramParams.SendStickerParams>;
/** This type represent SendVideoParams and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendVideo = id<"video", TelegramParams.SendVideoParams>;
/** This type represent SendVideoNoteParams and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendVideoNote = id<
	"video_note",
	TelegramParams.SendVideoNoteParams
>;
/** This type represent SendVoiceParams and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendVoice = id<"voice", TelegramParams.SendVoiceParams>;

/** This Union type represent a media that can be sended and used by {@link Contexts.MessageContext.sendMedia} */
export type tSendMethods =
	| tSendAnimation
	| tSendAudio
	| tSendDocument
	| tSendPhoto
	| tSendSticker
	| tSendVideo
	| tSendVideoNote
	| tSendVoice;

/** Enum of ChatType property */
export enum ChatType {
	Private = "private",
	Group = "group",
	Supergroup = "supergroup",
	Channel = "channel",
}

/** Enum of PollType property */
export enum PollType {
	Regular = "regular",
	Quiz = "quiz",
}

/** Mapping attachments type to their structures */
export interface AttachmentsMapping {
	animation: Attachments.AnimationAttachment;
	audio: Attachments.AudioAttachment;
	contact: Attachments.ContactAttachment;
	document: Attachments.DocumentAttachment;
	location: Attachments.LocationAttachment;
	photo: Attachments.PhotoAttachment;
	poll: Attachments.PollAttachment;
	sticker: Attachments.StickerAttachment;
	story: Attachments.StoryAttachment;
	venue: Attachments.VenueAttachment;
	video_note: Attachments.VideoNoteAttachment;
	video: Attachments.VideoAttachment;
	voice: Attachments.VoiceAttachment;
}

/** Enum of EntityType property */
export enum EntityType {
	Mention = "mention",
	Hashtag = "hashtag",
	Cashtag = "cashtag",
	BotCommand = "bot_command",
	Url = "url",
	Email = "email",
	PhoneNumber = "phone_number",
	Bold = "bold",
	Italic = "italic",
	Underline = "underline",
	Strikethrough = "strikethrough",
	Code = "code",
	Pre = "pre",
	TextLink = "text_link",
	TextMention = "text_mention",
}
