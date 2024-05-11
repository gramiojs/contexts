import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { DocumentAttachment } from "./attachments/document";
import { backgroundFillMap } from "./background-fill";

/**
 * The background is a PNG or TGV (gzipped subset of SVG with MIME type “application/x-tgwallpattern”) pattern to be combined with the background fill chosen by the user.
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundtypepattern)
 */
@Inspectable()
export class BackgroundTypePattern {
	constructor(public payload: TelegramObjects.TelegramBackgroundTypePattern) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the background, always “pattern”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * Document with the pattern
	 */
	@Inspect()
	get document() {
		return new DocumentAttachment(this.payload.document);
	}

	/**
	 * The background fill that is combined with the pattern
	 */
	@Inspect()
	get fill(): (typeof backgroundFillMap)[keyof typeof backgroundFillMap] {
		// @ts-expect-error
		return new backgroundFillMap[this.payload.fill.type](this.payload.fill);
	}

	/**
	 * Intensity of the pattern when it is shown above the filled background; 0-100
	 */
	@Inspect()
	get intensity() {
		return this.payload.intensity;
	}

	/**
	 * *Optional*. *True*, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only
	 */
	@Inspect()
	get isInverted() {
		return this.payload.is_inverted;
	}

	/**
	 * *Optional*. *True*, if the background moves slightly when the device is tilted
	 */
	@Inspect()
	get isMoving() {
		return this.payload.is_moving;
	}
}
memoizeGetters(BackgroundTypePattern, ["document", "fill"]);
