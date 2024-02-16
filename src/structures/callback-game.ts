import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

/** A placeholder, currently holds no information. */
@Inspectable()
export class CallbackGame {
	constructor(public payload: TelegramObjects.TelegramCallbackGame) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
