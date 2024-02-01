import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** A placeholder, currently holds no information. */
@Inspectable()
export class CallbackGame {
	constructor(public payload: Interfaces.TelegramCallbackGame) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
