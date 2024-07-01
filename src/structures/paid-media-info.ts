import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { paidMediaMap } from "./paid-media-map";

/**
 * Describes the paid media added to a message.
 *
 * [Documentation](https://core.telegram.org/bots/api/#paidmediainfo)
 */
@Inspectable()
export class PaidMediaInfo {
	constructor(public payload: TelegramObjects.TelegramPaidMediaInfo) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * The number of Telegram Stars that must be paid to buy access to the media
	 */
	@Inspect()
	get starCount() {
		return this.payload.star_count;
	}

	/**
	 * Information about the paid media
	 */
	@Inspect() // : (typeof backgroundFillMap)[keyof typeof backgroundFillMap]
	get paidMedia() {
		// @ts-expect-error
		return this.payload.paid_media.map((x) => new paidMediaMap[x.type](x));
	}
}
