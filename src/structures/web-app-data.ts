import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** Contains data sent from a Web App to the bot. */
@Inspectable()
export class WebAppData {
	constructor(public payload: Interfaces.TelegramWebAppData) {}

	/** The data. Be aware that a bad client can send arbitrary data in this field. */
	@Inspect()
	get data() {
		return this.payload.data;
	}

	/**
	 * Text of the `web_app` keyboard button, from which the Web App was opened.
	 * Be aware that a bad client can send arbitrary data in this field.
	 */
	@Inspect()
	get buttonText() {
		return this.payload.button_text;
	}
}
