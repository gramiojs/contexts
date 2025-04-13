import type { TelegramObjects } from "@gramio/types";
import { Message, PhotoSize } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import { Inspect, inspectable } from "inspectable";
import { Gift } from "structures/gift";
import { GiftInfo } from "structures/gift-info";
import { MessageEntity } from "structures/message-entity";
import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";
interface GiftContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object contains information about the chat whose identifier was shared with the bot using a `KeyboardButtonRequestChat` button. */
class GiftContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramGiftInfo;

	constructor(options: GiftContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "gift",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload.gift as TelegramObjects.TelegramGiftInfo;
	}

	/** Information about the gift */
	@Inspect()
	get giftInfo() {
		return new Gift(this.event.gift);
	}

	/** Identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
	@Inspect()
	get ownedGiftId() {
		return this.event.owned_gift_id;
	}

	/** Number of Telegram Stars that can be claimed by the receiver by converting the gift; omitted if conversion to Telegram Stars is impossible */
	@Inspect()
	get convertStarCount() {
		return this.event.convert_star_count;
	}

	/** Number of Telegram Stars that were prepaid by the sender for the ability to upgrade the gift */
	@Inspect()
	get prepaidUpgradeStarCount() {
		return this.event.prepaid_upgrade_star_count;
	}

	/** True, if the gift can be upgraded to a unique gift */
	@Inspect()
	get canBeUpgraded() {
		return this.event.can_be_upgraded;
	}

	/** Text of the message that was added to the gift */
	@Inspect()
	get text() {
		return this.event.text;
	}

	/** Special entities that appear in the text */
	@Inspect()
	get entities() {
		return this.event.entities?.map((entity) => new MessageEntity(entity));
	}

	/** True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
	@Inspect()
	get isPrivate() {
		return this.event.is_private;
	}
}

interface GiftContext<Bot extends BotLike>
	extends Constructor<GiftContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<Bot, GiftContext<Bot>, GiftContextOptions<Bot>> {}
applyMixins(GiftContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(GiftContext, {
	serialize(context) {
		return {
			gift: context.gift,
			ownedGiftId: context.ownedGiftId,
			convertStarCount: context.convertStarCount,
			prepaidUpgradeStarCount: context.prepaidUpgradeStarCount,
			canBeUpgraded: context.canBeUpgraded,
			text: context.text,
			entities: context.entities,
			isPrivate: context.isPrivate,
		};
	},
});

export { GiftContext };
