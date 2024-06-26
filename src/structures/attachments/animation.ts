import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { PhotoSize } from "../photo-size";

import type { AttachmentType } from "../../types";
import { memoizeGetters } from "../../utils";
import { FileAttachment } from "./file-attachment";

/**
 * This object represents an animation file
 * (GIF or H.264/MPEG-4 AVC video without sound).
 */
// TODO: extended: ['fileId', 'fileUniqueId']
@Inspectable()
export class AnimationAttachment extends FileAttachment<TelegramObjects.TelegramAnimation> {
	attachmentType: AttachmentType = "animation";

	/** Video width as defined by sender */
	@Inspect()
	get width() {
		return this.payload.width;
	}

	/** Video height as defined by sender */
	@Inspect()
	get height() {
		return this.payload.height;
	}

	/** Duration of the video in seconds as defined by sender */
	@Inspect()
	get duration() {
		return this.payload.duration;
	}

	/** Animation thumbnail as defined by sender */
	@Inspect({ nullable: false })
	get thumbnail() {
		const { thumbnail } = this.payload;

		if (!thumbnail) return undefined;

		return new PhotoSize(thumbnail);
	}

	/** Original animation filename as defined by sender */
	@Inspect({ nullable: false })
	get fileName() {
		return this.payload.file_name;
	}

	/** MIME type of the file as defined by sender */
	@Inspect({ nullable: false })
	get mimeType() {
		return this.payload.mime_type;
	}

	/** File size */
	@Inspect({ nullable: false })
	get fileSize() {
		return this.payload.file_size;
	}
}

memoizeGetters(AnimationAttachment, ["thumbnail"]);
