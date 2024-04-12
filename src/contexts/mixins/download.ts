import type { BotLike } from "#types";
import type { Attachment } from "../../structures/attachments";

import type { Context } from "../context";

interface DownloadMixinMetadata {
	get attachment(): Attachment | undefined;
}

/** This object represents a mixin that can be used to download media files */
class DownloadMixin<Bot extends BotLike> {
	/** Downloads attachment */
	download(): Promise<ArrayBuffer>;
	download(path: string): Promise<string>;

	download(path?: string) {
		if (this.attachment === undefined) throw Error("No media in this message");

		if (path) return this.bot.downloadFile(this.attachment, path);

		return this.bot.downloadFile(this.attachment);
	}
}

interface DownloadMixin<Bot extends BotLike>
	extends Context<Bot>,
		DownloadMixinMetadata {}

export { DownloadMixin };
