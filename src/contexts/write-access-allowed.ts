import type { TelegramObjects } from "@gramio/types";
import { Message, WriteAccessAllowed } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import { inspectable } from "inspectable";
import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface WriteAccessAllowedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/**
 * This object represents a service message about a user allowing a bot to write messages after adding it to the attachment menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method [requestWriteAccess](https://core.telegram.org/bots/webapps#initializing-mini-apps).
 *
 * [Documentation](https://core.telegram.org/bots/api/#writeaccessallowed)
 */
class WriteAccessAllowedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	constructor(options: WriteAccessAllowedContextOptions<Bot>) {
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
				.write_access_allowed as TelegramObjects.TelegramWriteAccessAllowed,
		);
	}
}

interface WriteAccessAllowedContext<Bot extends BotLike>
	extends Constructor<WriteAccessAllowedContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<
			Bot,
			WriteAccessAllowedContext<Bot>,
			WriteAccessAllowedContextOptions<Bot>
		> {}
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
