import {
	APIMethods,
	TelegramInputMedia,
	TelegramParams,
	TelegramUpdate,
} from "@gramio/types";
import { contextsMappings } from "#utils";

import * as Attachments from "./structures/attachments";

export interface BotLike {
	api: APIMethods;
}

export type ContextsMapping<Bot extends BotLike> = {
	[K in keyof typeof contextsMappings]: (typeof contextsMappings)[K] & {
		bot: Bot;
	};
};

export type ContextType<
	Bot extends BotLike,
	Name extends keyof ContextsMapping<Bot>,
> = InstanceType<(typeof contextsMappings)[Name]>;

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
	| "boost_added";
// | "removed_chat_boost";

export type CustomEventName = "service_message";
export type UpdateName =
	| Exclude<keyof TelegramUpdate, "update_id">
	| MessageEventName
	| CustomEventName;

export type JoinUnion<T> = T extends infer U
	? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
	  U extends any
		? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
		  Record<string, any> & U
		: never
	: never;

export type MaybeArray<T> = T | T[];

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

// https://github.com/grammyjs/grammY/blob/b8ac3d65bad6ed6a63a82c8bd8c642406c95532c/src/composer.ts#L8
/** Permits `string` but gives hints */
export type SoftString<S extends string> = (string & {}) | S;

/** Like `Required<T>` but for specified keys of `T` */
export type Require<O, K extends keyof O> = { [P in K]-?: NonNullable<O[P]> };

// biome-ignore lint/complexity/noBannedTypes: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Constructor<T = {}> = new (...args: any[]) => T;

/** Like `Require<O, K>` but it sets `V` as the value for `K` values */
export type RequireValue<O, K extends keyof O, V> = Omit<O, K> & {
	[P in K]-?: V;
};

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

type id<T, I extends { chat_id: string | number }> = { type: T } & Optional<
	I,
	"chat_id"
>;

export type tSendAnimation = id<
	"animation",
	TelegramParams.SendAnimationParams
>;
export type tSendAudio = id<"audio", TelegramParams.SendAudioParams>;
export type tSendDocument = id<"document", TelegramParams.SendDocumentParams>;
export type tSendPhoto = id<"photo", TelegramParams.SendPhotoParams>;
export type tSendSticker = id<"sticker", TelegramParams.SendStickerParams>;
export type tSendVideo = id<"video", TelegramParams.SendVideoParams>;
export type tSendVideoNote = id<
	"video_note",
	TelegramParams.SendVideoNoteParams
>;
export type tSendVoice = id<"voice", TelegramParams.SendVoiceParams>;

export type tSendMethods =
	| tSendAnimation
	| tSendAudio
	| tSendDocument
	| tSendPhoto
	| tSendSticker
	| tSendVideo
	| tSendVideoNote
	| tSendVoice;

export enum ChatType {
	Private = "private",
	Group = "group",
	Supergroup = "supergroup",
	Channel = "channel",
}

export enum PollType {
	Regular = "regular",
	Quiz = "quiz",
}

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
