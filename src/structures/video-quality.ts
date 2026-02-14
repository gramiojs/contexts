import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/**
 * This object represents a video file of a specific quality.
 *
 * [Documentation](https://core.telegram.org/bots/api/#videoquality)
 */
@Inspectable()
export class VideoQuality {
	constructor(public payload: TelegramObjects.TelegramVideoQuality) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Identifier for this file, which can be used to download or reuse the file
	 */
	@Inspect()
	get fileId() {
		return this.payload.file_id;
	}

	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
	 */
	@Inspect()
	get fileUniqueId() {
		return this.payload.file_unique_id;
	}

	/**
	 * Video width
	 */
	@Inspect()
	get width() {
		return this.payload.width;
	}

	/**
	 * Video height
	 */
	@Inspect()
	get height() {
		return this.payload.height;
	}

	/**
	 * Codec that was used to encode the video, for example, "h264", "h265", or "av01"
	 */
	@Inspect()
	get codec() {
		return this.payload.codec;
	}

	/**
	 * *Optional*. File size in bytes
	 */
	@Inspect({ nullable: false })
	get fileSize() {
		return this.payload.file_size;
	}
}
