import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** Contains information about a Web App. */
@Inspectable()
export class WebAppInfo {
	constructor(public payload: TelegramObjects.TelegramWebAppInfo) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
	@Inspect()
	get url() {
		return this.payload.url;
	}
}
