import * as Interfaces from "@gramio/types/objects";
import { Message, WriteAccessAllowed } from "../structures";

import type { Bot } from "gramio";
import { applyMixins, memoizeGetters } from "#utils";
import { type Constructor } from "#utils";

import { inspectable } from "inspectable";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface WriteAccessAllowedContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

class WriteAccessAllowedContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: WriteAccessAllowedContextOptions) {
		super({
			bot: options.bot,
			updateType: "write_access_allowed",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Service message: user allows a bot to write messages after adding it to the attachment menu */
	get eventAllowance() {
		return new WriteAccessAllowed(
			this.payload
				.write_access_allowed as Interfaces.TelegramWriteAccessAllowed,
		);
	}
}

interface WriteAccessAllowedContext
	extends Constructor<WriteAccessAllowedContext>,
		Message,
		TargetMixin,
		SendMixin,
		ChatActionMixin,
		NodeMixin,
		PinsMixin,
		CloneMixin<WriteAccessAllowedContext, WriteAccessAllowedContextOptions> {}
applyMixins(WriteAccessAllowedContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(WriteAccessAllowedContext, ["eventAllowance"]);

inspectable(WriteAccessAllowedContext, {
	serialize(context) {
		return {
			fromRequest: context.eventAllowance.fromRequest,
			webAppName: context.eventAllowance.webAppName,
			fromAttachmentMenu: context.eventAllowance.fromAttachmentMenu,
		};
	},
});

export { WriteAccessAllowedContext };
