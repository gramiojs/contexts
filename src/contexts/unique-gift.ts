import type { TelegramObjects } from "@gramio/types";
import { Message, PhotoSize, UniqueGiftInfo } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import { Inspect, inspectable } from "inspectable";
import { Gift } from "structures/gift";
import { GiftInfo } from "structures/gift-info";
import { MessageEntity } from "structures/message-entity";
import { UniqueGift } from "structures/unique-gift";
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

interface UniqueGiftContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object contains information about the chat whose identifier was shared with the bot using a `KeyboardButtonRequestChat` button. */
class UniqueGiftContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	private event: TelegramObjects.TelegramUniqueGiftInfo;

	constructor(options: UniqueGiftContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "unique_gift",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = this.payload
			.unique_gift as TelegramObjects.TelegramUniqueGiftInfo;
	}
	/**
	 * Information about the gift
	 */
	@Inspect()
	get uniqueGiftInfo() {
		return new UniqueGift(this.event.gift);
	}
	/**
	 * Origin of the gift. Currently, either “upgrade” or “transfer”
	 */
	@Inspect()
	get origin() {
		return this.event.origin;
	}
	/**
	 * *Optional*. Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts
	 */
	@Inspect()
	get ownedGiftId() {
		return this.event.owned_gift_id;
	}
	/**
	 * *Optional*. Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift
	 */
	@Inspect()
	get transferStarCount() {
		return this.event.transfer_star_count;
	}
}

interface UniqueGiftContext<Bot extends BotLike>
	extends Constructor<UniqueGiftContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<Bot, UniqueGiftContext<Bot>, UniqueGiftContextOptions<Bot>> {}
applyMixins(UniqueGiftContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);

inspectable(UniqueGiftContext, {
	serialize(context) {
		return {
			gift: context.gift,
			ownedGiftId: context.ownedGiftId,
			transferStarCount: context.transferStarCount,
			origin: context.origin,
		};
	},
});

export { UniqueGiftContext };
