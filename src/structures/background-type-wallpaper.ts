import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { DocumentAttachment } from "./attachments/document";

/**
 * The background is a wallpaper in the JPEG format.
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundtypewallpaper)
 */
@Inspectable()
export class BackgroundTypeWallpaper {
	constructor(
		public payload: TelegramObjects.TelegramBackgroundTypeWallpaper,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the background, always “wallpaper”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * Document with the wallpaper
	 */
	@Inspect()
	get document() {
		return new DocumentAttachment(this.payload.document);
	}

	/**
	 * Dimming of the background in dark themes, as a percentage; 0-100
	 */
	@Inspect()
	get darkThemeDimming() {
		return this.payload.dark_theme_dimming;
	}

	/**
	 * *Optional*. *True*, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12
	 */
	@Inspect()
	get isBlurred() {
		return this.payload.is_blurred;
	}

	/**
	 * *Optional*. *True*, if the background moves slightly when the device is tilted
	 */
	@Inspect()
	get isMoving() {
		return this.payload.is_moving;
	}
}
memoizeGetters(BackgroundTypeWallpaper, ["document"]);
