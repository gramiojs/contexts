import type { TelegramObjects } from "@gramio/types";
import { PaidMediaLivePhoto } from "./paid-media-live-photo";
import { PaidMediaPhoto } from "./paid-media-photo";
import { PaidMediaPreview } from "./paid-media-preview";
import { PaidMediaVideo } from "./paid-media-video";

/**
 * This object describes paid media. Currently, it can be one of
 *
 * * [PaidMediaLivePhoto](https://core.telegram.org/bots/api/#paidmedialivephoto)
 * * [PaidMediaPhoto](https://core.telegram.org/bots/api/#paidmediaphoto)
 * * [PaidMediaPreview](https://core.telegram.org/bots/api/#paidmediapreview)
 * * [PaidMediaVideo](https://core.telegram.org/bots/api/#paidmediavideo)
 *
 * [Documentation](https://core.telegram.org/bots/api/#paidmedia)
 */
export const paidMediaMap = {
	live_photo: PaidMediaLivePhoto,
	preview: PaidMediaPreview,
	video: PaidMediaVideo,
	photo: PaidMediaPhoto,
} satisfies Record<TelegramObjects.TelegramPaidMedia["type"], unknown>;
