import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { StickerAttachment } from "./attachments/index";

import { memoizeGetters } from "../utils";
import { PhotoSize } from "./photo-size";

/** This object represents a sticker set. */
@Inspectable()
export class StickerSet {
	constructor(public payload: TelegramObjects.TelegramStickerSet) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Sticker set name */
	@Inspect()
	get name() {
		return this.payload.name;
	}

	/** Sticker set title */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/** Type of stickers in the set, currently one of `regular`, `mask`, `custom_emoji` */
	@Inspect()
	get stickerType() {
		return this.payload.sticker_type;
	}

	/** List of all set stickers */
	@Inspect({ nullable: false })
	get stickers() {
		const { stickers } = this.payload;

		if (!stickers.length) return undefined;
		return stickers.map((sticker) => new StickerAttachment(sticker));
	}

	/** Sticker set thumbnail in the .WEBP or .TGS format */
	@Inspect({ nullable: false })
	get thumbnail() {
		const { thumbnail } = this.payload;

		if (!thumbnail) return undefined;

		return new PhotoSize(thumbnail);
	}
}

memoizeGetters(StickerSet, ["thumbnail"]);
