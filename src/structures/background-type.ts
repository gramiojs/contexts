import type { TelegramObjects } from "@gramio/types";
import { BackgroundTypeChatTheme } from "./background-type-chat-theme";
import { BackgroundTypeFill } from "./background-type-fill";
import { BackgroundTypePattern } from "./background-type-pattern";
import { BackgroundTypeWallpaper } from "./background-type-wallpaper";

/**
 * This object describes the type of a background. Currently, it can be one of
 *
 * * [BackgroundTypeFill](https://core.telegram.org/bots/api/#backgroundtypefill)
 * * [BackgroundTypeWallpaper](https://core.telegram.org/bots/api/#backgroundtypewallpaper)
 * * [BackgroundTypePattern](https://core.telegram.org/bots/api/#backgroundtypepattern)
 * * [BackgroundTypeChatTheme](https://core.telegram.org/bots/api/#backgroundtypechattheme)
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundtype)
 */
export const backgroundTypeMap = {
	fill: BackgroundTypeFill,
	wallpaper: BackgroundTypeWallpaper,
	pattern: BackgroundTypePattern,
	chat_theme: BackgroundTypeChatTheme,
} satisfies Record<TelegramObjects.TelegramBackgroundType["type"], unknown>;
