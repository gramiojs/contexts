import type { TelegramObjects } from "@gramio/types";

import { inspectable } from "inspectable";
import { BusinessMessagesDeleted } from "../structures/index";
import type { Constructor } from "../types";
import type { BotLike } from "../types";
import { applyMixins } from "../utils";
import { Context } from "./context";
import { CloneMixin } from "./mixins/index";

interface BusinessMessagesDeletedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramBusinessMessagesDeleted;
	updateId: number;
}

/** This object represents a boost added to a chat or changed. */
class BusinessMessagesDeletedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramBusinessMessagesDeleted;

	constructor(options: BusinessMessagesDeletedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "deleted_business_messages",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface BusinessMessagesDeletedContext<Bot extends BotLike>
	extends Constructor<BusinessMessagesDeletedContext<Bot>>,
		BusinessMessagesDeleted,
		CloneMixin<
			Bot,
			BusinessMessagesDeletedContext<Bot>,
			BusinessMessagesDeletedContextOptions<Bot>
		> {}
applyMixins(BusinessMessagesDeletedContext, [
	BusinessMessagesDeleted,
	CloneMixin,
]);

export { BusinessMessagesDeletedContext };

inspectable(BusinessMessagesDeletedContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: BusinessMessagesDeletedContext<any>) {
		return context;
	},
});
