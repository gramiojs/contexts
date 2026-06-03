import { MessageContext } from "contexts/message";
import { applyMixins } from "utils";
import type { Attachment } from "../../structures/attachments/index";
import type { BotLike, FileDownload } from "../../types";
import type { Context } from "../context";

interface DownloadMixinMetadata {
	get attachment(): Attachment | undefined;
}

/** This object represents a mixin that can be used to download media files */
class DownloadMixin<Bot extends BotLike> {
	/**
	 * Download the message's attachment.
	 *
	 * Returns a lazy, `Response`-like {@link FileDownload} handle — `await` it for
	 * an `ArrayBuffer`, or call `.bytes()` / `.text()` / `.json()` / `.blob()` /
	 * `.stream()` / `.toFile(path)` / `.link()` / `.info()`. Pass `path` to save
	 * straight to disk.
	 *
	 * @example
	 * ```ts
	 * await ctx.download().toFile("./photo.jpg");
	 * const text = await ctx.download().text();
	 * ```
	 */
	download(): FileDownload;
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

applyMixins(MessageContext, [DownloadMixin]);
