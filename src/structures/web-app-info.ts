import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

/** Contains information about a Web App. */
@Inspectable()
export class WebAppInfo {
	constructor(public payload: TelegramObjects.TelegramWebAppInfo) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
	@Inspect()
	get url() {
		return this.payload.url;
	}
}
