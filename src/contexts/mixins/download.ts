import {
	Attachment,
	// MediaInputTo,
	// MediaSourceTo,
	// MediaSourceToBuffer,
	// MediaSourceToPath,
	// MediaSourceToStream,
} from "../../structures/attachments";

import { Context } from "../context";

interface DownloadMixinMetadata {
	get attachment(): Attachment | undefined;
}

/** This object represents a mixin that can be used to download media files */
class DownloadMixin {
	// /** Downloads attachment */
	// download(to?: MediaSourceToBuffer): Promise<Buffer | null>;
	// download(to: MediaSourceToPath): Promise<void | null>;
	// download(to: MediaSourceToStream): Promise<void | null>;
	// download(to: MediaInputTo = MediaSourceTo.buffer()) {
	// 	if (this.attachment === undefined) {
	// 		return Promise.resolve(null);
	// 	}
	// 	return this.telegram.downloadFile(this.attachment, to);
	// }
}

interface DownloadMixin extends Context, DownloadMixinMetadata {}

export { DownloadMixin };
