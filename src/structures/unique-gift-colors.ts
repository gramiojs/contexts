import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * This object contains information about the color scheme for a user's name, message replies and link previews based on a unique gift.
 *
 * [Documentation](https://core.telegram.org/bots/api/#uniquegiftcolors)
 */
@Inspectable()
export class UniqueGiftColors {
	constructor(public payload: TelegramObjects.TelegramUniqueGiftColors) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Custom emoji identifier of the unique gift's model
	 */
	@Inspect()
	get modelCustomEmojiId() {
		return this.payload.model_custom_emoji_id;
	}

	/**
	 * Custom emoji identifier of the unique gift's symbol
	 */
	@Inspect()
	get symbolCustomEmojiId() {
		return this.payload.symbol_custom_emoji_id;
	}

	/**
	 * Main color used in light themes; RGB format
	 */
	@Inspect()
	get lightThemeMainColor() {
		return this.payload.light_theme_main_color;
	}

	/**
	 * List of 1-3 additional colors used in light themes; RGB format
	 */
	@Inspect()
	get lightThemeOtherColors() {
		return this.payload.light_theme_other_colors;
	}

	/**
	 * Main color used in dark themes; RGB format
	 */
	@Inspect()
	get darkThemeMainColor() {
		return this.payload.dark_theme_main_color;
	}

	/**
	 * List of 1-3 additional colors used in dark themes; RGB format
	 */
	@Inspect()
	get darkThemeOtherColors() {
		return this.payload.dark_theme_other_colors;
	}
}
