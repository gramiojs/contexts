import type { TelegramObjects } from "@gramio/types";
import { PaidMediaPhoto } from "./paid-media-photo";
import { PaidMediaPreview } from "./paid-media-preview";
import { PaidMediaVideo } from "./paid-media-video";

/**
 * This object describes paid media. Currently, it can be one of
 *
 * * [PaidMediaPreview](https://core.telegram.org/bots/api/#paidmediapreview)
 * * [PaidMediaPhoto](https://core.telegram.org/bots/api/#paidmediaphoto)
 * * [PaidMediaVideo](https://core.telegram.org/bots/api/#paidmediavideo)
 *
 * [Documentation](https://core.telegram.org/bots/api/#paidmedia)
 */
export const paidMediaMap = {
	preview: PaidMediaPreview,
	video: PaidMediaVideo,
	photo: PaidMediaPhoto,
} satisfies Record<TelegramObjects.TelegramPaidMedia["type"], unknown>;
