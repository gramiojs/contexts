import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

/** This object represents a service message about a user allowing a bot added to the attachment menu to write messages. Currently holds no information. */
@Inspectable()
export class WriteAccessAllowed {
	constructor(public payload: TelegramObjects.TelegramWriteAccessAllowed) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** `true`, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess */
	@Inspect({ nullable: false })
	get fromRequest() {
		return this.payload.from_request;
	}

	/** Name of the Web App which was launched from a link */
	@Inspect({ nullable: false })
	get webAppName() {
		return this.payload.web_app_name;
	}

	/** `true`, if the access was granted when the bot was added to the attachment or side menu */
	@Inspect({ nullable: false })
	get fromAttachmentMenu() {
		return this.payload.web_app_name;
	}
}
