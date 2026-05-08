import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import type { AttachmentType } from "../../types";
import { memoizeGetters } from "../../utils";
import { PhotoSize } from "../photo-size";
import { FileAttachment } from "./file-attachment";

/** This object represents a live photo. */
@Inspectable()
export class LivePhotoAttachment extends FileAttachment<TelegramObjects.TelegramLivePhoto> {
	attachmentType: AttachmentType = "live_photo";

	/** Available sizes of the corresponding static photo */
	@Inspect({ nullable: false })
	get photo() {
		const { photo } = this.payload;

		if (!photo) return undefined;

		return photo.map((size) => new PhotoSize(size));
	}

	/** Video width as defined by the sender */
	@Inspect()
	get width() {
		return this.payload.width;
	}

	/** Video height as defined by the sender */
	@Inspect()
	get height() {
		return this.payload.height;
	}

	/** Duration of the video in seconds as defined by the sender */
	@Inspect()
	get duration() {
		return this.payload.duration;
	}

	/** MIME type of the file as defined by the sender */
	@Inspect({ nullable: false })
	get mimeType() {
		return this.payload.mime_type;
	}

	/** File size in bytes */
	@Inspect({ nullable: false })
	get fileSize() {
		return this.payload.file_size;
	}
}

memoizeGetters(LivePhotoAttachment, ["photo"]);
