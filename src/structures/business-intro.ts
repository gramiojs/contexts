import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { StickerAttachment } from "./attachments/sticker";

/**
 * Contains information about the start page settings of a Telegram Business account.
 *
 * [Documentation](https://core.telegram.org/bots/api/#businessintro)
 */
@Inspectable()
export class BusinessIntro {
	constructor(public payload: TelegramObjects.TelegramBusinessIntro) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *Optional*. Title text of the business intro
	 */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/**
	 * *Optional*. Message text of the business intro
	 */
	@Inspect()
	get message() {
		return this.payload.message;
	}

	/**
	 * *Optional*. Sticker of the business intro
	 */
	@Inspect()
	get sticker() {
		return this.payload.sticker
			? new StickerAttachment(this.payload.sticker)
			: undefined;
	}
}
memoizeGetters(BusinessIntro, ["sticker"]);
