import type { TelegramObjects } from "@gramio/types";
import { Inspectable } from "inspectable";

/** A placeholder, currently holds no information. */
@Inspectable()
export class CallbackGame {
	constructor(public payload: TelegramObjects.TelegramCallbackGame) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
