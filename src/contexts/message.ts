import { Inspect, inspectable } from "inspectable";

import {
	AnimationAttachment,
	Attachment,
	AudioAttachment,
	ContactAttachment,
	DocumentAttachment,
	LocationAttachment,
	PhotoAttachment,
	PollAttachment,
	StickerAttachment,
	StoryAttachment,
	VenueAttachment,
	VideoAttachment,
	VideoNoteAttachment,
	VoiceAttachment,
} from "../structures/attachments/index";

// import { MediaGroup } from "../media-group";
import { Message } from "../structures/message";
import type { MessageEntity } from "../structures/message-entity";

import type { TelegramObjects } from "@gramio/types";

import type {
	AttachmentType,
	AttachmentType as AttachmentTypeEnum,
	AttachmentsMapping,
	Constructor,
	EntityType,
	Require,
	RequireValue,
	UpdateName,
} from "../types";
import {
	applyMixins,
	filterPayload,
	isParsable,
	memoizeGetters,
} from "../utils";
import { EVENTS, SERVICE_MESSAGE_EVENTS } from "../utils";

import { PaidMediaInfo } from "../structures/paid-media-info";
import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatControlMixin,
	ChatInviteControlMixin,
	ChatMemberControlMixin,
	ChatSenderControlMixin,
	CloneMixin,
	type DownloadMixin,
	PinsMixin,
	SendMixin,
} from "./mixins/index";
import type { NodeMixin } from "./mixins/node";
import { TargetMixin } from "./mixins/target";

interface MessageContextOptions<Bot extends BotLike> {
	bot: Bot;
	update?: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId?: number;
	type?: UpdateName;
}

/** Called when `message` event occurs */
class MessageContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	#text: string | undefined;
	#caption: string | undefined;

	// mediaGroup?: MediaGroup;

	constructor(options: MessageContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: options.type ?? "message",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;

		this.#text = this.payload.text;
		this.#caption = this.payload.caption;
	}

	/**
	 * For text messages, the actual UTF-8 text of the message, 0-4096 characters
	 */
	get text() {
		return this.#text;
	}

	set text(text) {
		this.#text = text;
	}

	/** Checks if the message has `text` property */
	hasText(): this is Require<this, "text"> {
		return this.text !== undefined;
	}

	/**
	 * Caption for the animation, audio, document, photo, video or voice,
	 * 0-1024 characters
	 */
	get caption() {
		return this.#caption;
	}

	set caption(caption) {
		this.#caption = caption;
	}

	/** Checks if the message has `caption` property */
	hasCaption(): this is Require<this, "caption"> {
		return this.caption !== undefined;
	}

	/** Checks if the message has `dice` property */
	hasDice(): this is Require<this, "dice"> {
		return this.dice !== undefined;
	}

	/** Value after the `/start` command */
	get rawStartPayload() {
		if (!this.hasText()) return undefined;

		const text = this.text as string;

		if (!text.startsWith("/start") || text === "/start") return undefined;

		return text.split(" ")[1];
	}

	/**
	 * Parsed value ("1" => 1, `{"a": 1}` => {a: 1}) after the `/start` command
	 * @deprecated Use `rawStartPayload` instead. This property will be reworked and it will be the same as `rawStartPayload`
	 */
	get startPayload() {
		let payload: number | string | undefined = this.rawStartPayload;

		if (payload === undefined) return undefined;

		if (!Number.isNaN(+payload)) {
			payload = Number.parseInt(payload, 10);
		} else if (isParsable(payload)) {
			payload = JSON.parse(payload);
		}

		return payload;
	}

	/** Does this message have start payload? */
	hasStartPayload(): this is Require<this, "startPayload"> {
		return this.startPayload !== undefined;
	}

	/** Checks if the message has `author_signature` property */
	hasAuthorSignature(): this is Require<this, "authorSignature"> {
		return this.authorSignature !== undefined;
	}

	/** Checks if there are any entities (with specified type) */
	hasEntities(
		type?: EntityType | MessageEntity["type"],
	): this is Require<this, "entities"> {
		if (this.entities === undefined) {
			return false;
		}

		if (type === undefined) {
			return this.entities.length !== 0;
		}

		return this.entities.some((entity) => entity.type === type);
	}

	/** Checks if there are any caption entities (with specified type) */
	hasCaptionEntities(
		type?: EntityType | MessageEntity["type"],
	): this is Require<this, "captionEntities"> {
		if (this.captionEntities === undefined) {
			return false;
		}

		if (type === undefined) {
			return this.captionEntities.length !== 0;
		}

		return this.captionEntities.some((entity) => entity.type === type);
	}

	@Inspect()
	get paidMedia() {
		return this.payload.paid_media
			? new PaidMediaInfo(this.payload.paid_media)
			: undefined;
	}
	// /** Checks whether current message contains a media group (`mergeMediaEvents` must be on) */
	// isMediaGroup(): this is Require<this, "mediaGroupId" | "mediaGroup"> {
	// 	return this.mediaGroupId !== undefined;
	// }

	/** Message attachment */
	get attachment() {
		if (this.photo) {
			return new PhotoAttachment(this.photo);
		}

		if (this.contact) {
			return new ContactAttachment(
				this.payload.contact as TelegramObjects.TelegramContact,
			);
		}

		if (this.poll) {
			return new PollAttachment(
				this.payload.poll as TelegramObjects.TelegramPoll,
			);
		}

		if (this.venue) {
			return new VenueAttachment(
				this.payload.venue as TelegramObjects.TelegramVenue,
			);
		}

		if (this.location) {
			return new LocationAttachment(
				this.payload.location as TelegramObjects.TelegramLocation,
			);
		}

		return (
			this.sticker ??
			this.story ??
			this.animation ??
			this.audio ??
			this.document ??
			this.video ??
			this.videoNote ??
			this.voice
		);
	}

	/** Does this message have an attachment with a specific type `type`? */
	hasAttachmentType<T extends AttachmentType>(
		type: T,
	): this is RequireValue<this, "attachment", AttachmentsMapping[T]> {
		return this.attachment?.attachmentType === type;
	}

	/** Does this message even have an attachment? */
	hasAttachment(): this is Require<this, "attachment"> {
		return this.attachment !== undefined;
	}

	/** Is this message a giveaway */
	isGiveaway(): this is Require<this, "giveaway"> {
		return this.giveaway !== undefined;
	}

	/** Is this message an event? */
	isEvent() {
		return EVENTS.some((event) => this[event[0]] !== undefined);
	}

	/** Event type */
	get eventType() {
		if (!this.isEvent()) {
			return undefined;
		}

		const value = EVENTS.find((event) => {
			const tValue = this[event[0]];

			if (Array.isArray(tValue)) {
				return tValue.length !== 0;
			}

			return tValue !== undefined;
		});

		if (value === undefined) return undefined;

		return value[1];
	}

	/** Is this message a service one? */
	isServiceMessage() {
		return SERVICE_MESSAGE_EVENTS.some(
			(event) => this.payload[event] !== undefined,
		);
	}
	/** Is this message in topic */
	isTopicMessage() {
		return !!this.payload.is_topic_message;
	}

	/** Does this message have a forward origin? */
	hasForwardOrigin(): this is Require<this, "forwardOrigin"> {
		return this.forwardOrigin !== undefined;
	}

	/** Does this message have a quote? */
	hasQuote(): this is Require<this, "quote"> {
		return this.quote !== undefined;
	}

	/** Does this message have link preview options? */
	hasLinkPreviewOptions(): this is Require<this, "linkPreviewOptions"> {
		return this.linkPreviewOptions !== undefined;
	}

	/** Does this message have external reply info? */
	hasReplyInfo(): this is Require<this, "externalReply"> {
		return this.externalReply !== undefined;
	}

	/** Does this message have reply message? */
	hasReplyMessage(): this is Require<this, "replyMessage"> {
		return this.replyMessage !== undefined;
	}

	/** Checks if the sent message has `via_bot` property */
	hasViaBot(): this is Require<this, "viaBot"> {
		return this.viaBot !== undefined;
	}

	/** @deprecated use `hasAttachmentType(type)` and `hasAttachment` instead */
	hasAttachments(type?: AttachmentType | AttachmentTypeEnum) {
		if (type === undefined) {
			return this.hasAttachment();
		}

		return this.hasAttachmentType(type);
	}
}

interface MessageContext<Bot extends BotLike>
	extends Constructor<MessageContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		DownloadMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		ChatControlMixin<Bot>,
		ChatSenderControlMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<Bot, MessageContext<Bot>, MessageContextOptions<Bot>> {}
applyMixins(MessageContext, [
	Message,
	TargetMixin,
	ChatActionMixin,
	// NodeMixin,
	// DownloadMixin,
	ChatInviteControlMixin,
	ChatControlMixin,
	ChatSenderControlMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
	// SendMixin,
]);
memoizeGetters(MessageContext, ["attachment"]);

inspectable(MessageContext, {
	serialize: (context) => {
		const payload = {
			id: context.id,
			from: context.from,
			createdAt: context.createdAt,
			chat: context.chat,
			senderBoostCount: context.senderBoostCount,
			replyMessage: context.replyMessage,
			viaBot: context.viaBot,
			updatedAt: context.updatedAt,
			authorSignature: context.authorSignature,
			text: context.text,
			entities: context.entities,
			captionEntities: context.captionEntities,
			dice: context.dice,
			caption: context.caption,
			contact: context.contact,
			location: context.location,
			venue: context.venue,
			poll: context.poll,
			replyMarkup: context.replyMarkup,
		};

		// if (context.mediaGroup !== undefined) {
		// 	payload.mediaGroup = context.mediaGroup;
		// } else {
		// 	payload.mediaGroupId = context.mediaGroupId;
		// 	payload.attachment = context.attachment;
		// }

		return filterPayload(payload);
	},
});

export { MessageContext };
