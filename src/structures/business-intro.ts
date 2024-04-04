import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { StickerAttachment } from "./attachments/sticker";

/**
 * [Documentation](https://core.telegram.org/bots/api/#businessintro)
 */
@Inspectable()
export class BusinessIntro {
	constructor(public payload: TelegramObjects.TelegramBusinessIntro) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Title text of the business intro */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/** Message text of the business intro */
	@Inspect()
	get message() {
		return this.payload.message;
	}

	/** Sticker of the business intro */
	@Inspect()
	get sticker() {
		return this.payload.sticker
			? new StickerAttachment(this.payload.sticker)
			: undefined;
	}
}
