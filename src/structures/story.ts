import { Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

@Inspectable()
export class Story {
	constructor(public payload: Interfaces.TelegramStory) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
