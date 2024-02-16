import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { type AttachmentType, memoizeGetters } from "#utils";

import { PhotoSize } from "../photo-size";
import { FileAttachment } from "./file-attachment";

/**
 * This object represents a general file (as opposed to photos, voice messages
 * and audio files).
 */
// TODO: extended: ['fileId', 'fileUniqueId']
@Inspectable()
export class DocumentAttachment extends FileAttachment<TelegramObjects.TelegramDocument> {
	attachmentType: AttachmentType = "document";

	/** Document thumbnail as defined by sender */
	@Inspect({ nullable: false })
	get thumbnail() {
		const { thumbnail } = this.payload;

		if (!thumbnail) {
			return undefined;
		}

		return new PhotoSize(thumbnail);
	}

	/** Original filename as defined by sender */
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

memoizeGetters(DocumentAttachment, ["thumbnail"]);
