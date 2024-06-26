import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/** Describes the options used for link preview generation. */
@Inspectable()
export class LinkPreviewOptions {
	constructor(public payload: TelegramObjects.TelegramLinkPreviewOptions) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** `true`, if the link preview is disabled */
	@Inspect({ compute: true, nullable: false })
	isDisabled() {
		return this.payload.is_disabled;
	}

	/** URL to use for the link preview. If empty, then the first URL found in the message text will be used */
	@Inspect({ nullable: false })
	get url() {
		return this.payload.url;
	}

	/** `true`, if the media in the link preview is supposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
	@Inspect({ compute: true, nullable: false })
	preferSmallMedia() {
		return this.payload.prefer_small_media;
	}

	/** `true`, if the media in the link preview is supposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
	@Inspect({ compute: true, nullable: false })
	preferLargeMedia() {
		return this.payload.prefer_large_media;
	}

	/** `true`, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
	@Inspect({ compute: true, nullable: false })
	showAboveText() {
		return this.payload.show_above_text;
	}
}
