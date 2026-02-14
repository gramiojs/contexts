import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

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
interface GiftUpgradeSentContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about an upgrade of a gift that was purchased after the gift was sent. */
class GiftUpgradeSentContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramGiftInfo;

	constructor(options: GiftUpgradeSentContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "gift_upgrade_sent",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.gift_upgrade_sent as TelegramObjects.TelegramGiftInfo;
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

	/** Number of Telegram Stars that were prepaid for the ability to upgrade the gift */
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

	/** True, if the gift's upgrade was purchased after the gift was sent */
	@Inspect()
	get isUpgradeSeparate() {
		return this.event.is_upgrade_separate;
	}

	/** *Optional*. Unique number reserved for this gift when upgraded */
	@Inspect()
	get uniqueGiftNumber() {
		return this.event.unique_gift_number;
	}
}

interface GiftUpgradeSentContext<Bot extends BotLike>
	extends Constructor<GiftUpgradeSentContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			GiftUpgradeSentContext<Bot>,
			GiftUpgradeSentContextOptions<Bot>
		> {}
applyMixins(GiftUpgradeSentContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(GiftUpgradeSentContext, {
	serialize(context) {
		return {
			giftInfo: context.giftInfo,
			ownedGiftId: context.ownedGiftId,
			convertStarCount: context.convertStarCount,
			prepaidUpgradeStarCount: context.prepaidUpgradeStarCount,
			canBeUpgraded: context.canBeUpgraded,
			text: context.text,
			entities: context.entities,
			isPrivate: context.isPrivate,
			isUpgradeSeparate: context.isUpgradeSeparate,
			uniqueGiftNumber: context.uniqueGiftNumber,
		};
	},
});

export { GiftUpgradeSentContext };
