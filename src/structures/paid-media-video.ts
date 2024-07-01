import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { VideoAttachment } from "./attachments/video";

/**
 * The paid media is a video.
 *
 * [Documentation](https://core.telegram.org/bots/api/#paidmediavideo)
 */
@Inspectable()
export class PaidMediaVideo {
	constructor(public payload: TelegramObjects.TelegramPaidMediaVideo) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the paid media, always “video”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * The video
	 */
	@Inspect()
	get video() {
		return new VideoAttachment(this.payload.video);
	}
}
memoizeGetters(PaidMediaVideo, ["video"]);
