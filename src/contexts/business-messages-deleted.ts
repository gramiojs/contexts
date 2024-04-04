import type { TelegramObjects } from "@gramio/types";

import { inspectable } from "inspectable";
import { BusinessConnection } from "#structures/business-connection";
import type { Constructor } from "#types";
import type { BotLike } from "#types";
import { applyMixins } from "#utils";
import { Context } from "./context";
import { CloneMixin } from "./mixins";

interface BusinessMessagesDeletedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramBusinessConnection;
	updateId: number;
}

/** This object represents a boost added to a chat or changed. */
class BusinessMessagesDeletedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramBusinessConnection;

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
		BusinessConnection,
		CloneMixin<
			Bot,
			BusinessMessagesDeletedContext<Bot>,
			BusinessMessagesDeletedContextOptions<Bot>
		> {}
applyMixins(BusinessMessagesDeletedContext, [BusinessConnection, CloneMixin]);

export { BusinessMessagesDeletedContext };

inspectable(BusinessMessagesDeletedContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: BusinessMessagesDeletedContext<any>) {
		return context;
	},
});
