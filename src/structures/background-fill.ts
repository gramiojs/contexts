import type { TelegramObjects } from "@gramio/types";
import { BackgroundFillFreeformGradient } from "./background-fill-freeform-gradient";
import { BackgroundFillGradient } from "./background-fill-gradient";
import { BackgroundFillSolid } from "./background-fill-solid";

/**
 * This object describes the way a background is filled based on the selected colors. Currently, it can be one of
 *
 * * [BackgroundFillSolid](https://core.telegram.org/bots/api/#backgroundfillsolid)
 * * [BackgroundFillGradient](https://core.telegram.org/bots/api/#backgroundfillgradient)
 * * [BackgroundFillFreeformGradient](https://core.telegram.org/bots/api/#backgroundfillfreeformgradient)
 *
 * [Documentation](https://core.telegram.org/bots/api/#backgroundfill)
 */
export const backgroundFillMap = {
	solid: BackgroundFillSolid,
	gradient: BackgroundFillGradient,
	freeform_gradient: BackgroundFillFreeformGradient,
} satisfies Record<TelegramObjects.TelegramBackgroundFill["type"], unknown>;
