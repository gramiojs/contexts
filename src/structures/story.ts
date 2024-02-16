import { Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

@Inspectable()
export class Story {
	constructor(public payload: TelegramObjects.TelegramStory) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
