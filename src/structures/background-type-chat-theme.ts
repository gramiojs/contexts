import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * The background is taken directly from a built-in chat theme.
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundtypechattheme)
 */
@Inspectable()
export class BackgroundTypeChatTheme {
	constructor(
		public payload: TelegramObjects.TelegramBackgroundTypeChatTheme,
	) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the background, always “chat\_theme”
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * Name of the chat theme, which is usually an emoji
	 */
	@Inspect()
	get themeName() {
		return this.payload.theme_name;
	}
}
