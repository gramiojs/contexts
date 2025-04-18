import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import type { AttachmentType } from "../../types";

import { PhotoSize } from "../photo-size";

import { memoizeGetters } from "../../utils";
import { FileAttachment } from "./file-attachment";

/** This object represents a video file. */
// TODO: extended: ['fileId', 'fileUniqueId']
@Inspectable()
export class VideoAttachment extends FileAttachment<TelegramObjects.TelegramVideo> {
	attachmentType: AttachmentType = "video";

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

	/** Video thumbnail */
	@Inspect({ nullable: false })
	get thumbnail() {
		const { thumbnail } = this.payload;

		if (!thumbnail) return undefined;

		return new PhotoSize(thumbnail);
	}

	/** Original filename as defined by sender */
	@Inspect({ nullable: false })
	get fileName() {
		return this.payload.file_name;
	}

	/** Mime type of a file as defined by sender */
	@Inspect({ nullable: false })
	get mimeType() {
		return this.payload.mime_type;
	}

	/** File size */
	@Inspect({ nullable: false })
	get fileSize() {
		return this.payload.file_size;
	}

	/** Video cover */
	@Inspect({ nullable: false })
	get cover() {
		return this.payload.cover ? this.payload.cover.map((size) => new PhotoSize(size)) : undefined;
	}

	/** Start timestamp */
	@Inspect({ nullable: false })
	get startTimestamp() {
		return this.payload.start_timestamp;
	}
}

memoizeGetters(VideoAttachment, ["thumbnail"]);
