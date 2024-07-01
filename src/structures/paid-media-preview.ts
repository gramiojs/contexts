import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * The paid media isn't available before the payment.
 *
 * [Documentation](https://core.telegram.org/bots/api/#paidmediapreview)
 */
@Inspectable()
export class PaidMediaPreview {
	constructor(public payload: TelegramObjects.TelegramPaidMediaPreview) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the paid media, always “preview”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * *Optional*. Media width as defined by the sender
	 */
	@Inspect()
	get width() {
		return this.payload.width;
	}

	/**
	 * *Optional*. Media height as defined by the sender
	 */
	@Inspect()
	get height() {
		return this.payload.height;
	}

	/**
	 * *Optional*. Duration of the media in seconds as defined by the sender
	 */
	@Inspect()
	get duration() {
		return this.payload.duration;
	}
}
