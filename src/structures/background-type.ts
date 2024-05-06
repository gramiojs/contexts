import type { TelegramObjects } from "@gramio/types";
import { BackgroundTypeChatTheme } from "./background-type-chat-theme";
import { BackgroundTypeFill } from "./background-type-fill";
import { BackgroundTypePattern } from "./background-type-pattern";
import { BackgroundTypeWallpaper } from "./background-type-wallpaper";

export const backgroundTypeMap = {
	fill: BackgroundTypeFill,
	wallpaper: BackgroundTypeWallpaper,
	pattern: BackgroundTypePattern,
	chat_theme: BackgroundTypeChatTheme,
} satisfies Record<TelegramObjects.TelegramBackgroundType["type"], unknown>;
