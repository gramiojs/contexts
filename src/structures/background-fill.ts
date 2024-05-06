import type { TelegramObjects } from "@gramio/types";
import { BackgroundFillFreeformGradient } from "./background-fill-freeform-gradient";
import { BackgroundFillGradient } from "./background-fill-gradient";
import { BackgroundFillSolid } from "./background-fill-solid";

export const backgroundFillMap = {
	solid: BackgroundFillSolid,
	gradient: BackgroundFillGradient,
	freeform_gradient: BackgroundFillFreeformGradient,
} satisfies Record<TelegramObjects.TelegramBackgroundFill["type"], unknown>;
