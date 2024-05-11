import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import type { AttachmentType } from "../../types";

import { PhotoSize } from "../photo-size";

import { memoizeGetters } from "../../utils";
import { FileAttachment } from "./file-attachment";

/**
 * This object represents an audio file to be treated as music by the Telegram
 * clients.
 */
// TODO: extended: ['fileId', 'fileUniqueId']
@Inspectable()
export class AudioAttachment extends FileAttachment<TelegramObjects.TelegramAudio> {
	attachmentType: AttachmentType = "audio";

	/** Duration of the audio in seconds as defined by sender */
	@Inspect()
	get duration() {
		return this.payload.duration;
	}

	/** Performer of the audio as defined by sender or by audio tags */
	@Inspect({ nullable: false })
	get performer() {
		return this.payload.performer;
	}

	/** Title of the audio as defined by sender or by audio tags */
	@Inspect({ nullable: false })
	get title() {
		return this.payload.title;
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

	/** Thumbnail of the album cover to which the music file belongs */
	@Inspect({ nullable: false })
	get thumbnail() {
		const { thumbnail } = this.payload;

		if (!thumbnail) return undefined;

		return new PhotoSize(thumbnail);
	}
}

memoizeGetters(AudioAttachment, ["thumbnail"]);
