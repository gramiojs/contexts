import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { PhotoAttachment } from "./attachments/photo";
import { PhotoSize } from "./photo-size";

/**
 * The paid media is a photo.
 *
 * [Documentation](https://core.telegram.org/bots/api/#paidmediaphoto)
 */
@Inspectable()
export class PaidMediaPhoto {
	constructor(public payload: TelegramObjects.TelegramPaidMediaPhoto) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the paid media, always “photo”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * The photo
	 */
	@Inspect()
	get photo() {
		return this.payload.photo
			? new PhotoAttachment(
					this.payload.photo.map((size) => new PhotoSize(size)),
				)
			: undefined;
	}
}
