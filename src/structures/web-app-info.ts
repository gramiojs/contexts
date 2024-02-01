import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** Contains information about a Web App. */
@Inspectable()
export class WebAppInfo {
	constructor(public payload: Interfaces.TelegramWebAppInfo) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
	@Inspect()
	get url() {
		return this.payload.url;
	}
}
