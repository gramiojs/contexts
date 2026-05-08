import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { LivePhotoAttachment } from "./attachments/live-photo";

/**
 * The paid media is a live photo.
 *
 * [Documentation](https://core.telegram.org/bots/api/#paidmedialivephoto)
 */
@Inspectable()
export class PaidMediaLivePhoto {
	constructor(public payload: TelegramObjects.TelegramPaidMediaLivePhoto) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Type of the paid media, always “live_photo” */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/** The live photo */
	@Inspect()
	get livePhoto() {
		return new LivePhotoAttachment(this.payload.live_photo);
	}
}

memoizeGetters(PaidMediaLivePhoto, ["livePhoto"]);
