import type { TelegramObjects } from "@gramio/types";

import { inspectable } from "inspectable";
import { BusinessConnection } from "../structures/business-connection";
import type { Constructor } from "../types";
import type { BotLike } from "../types";
import { applyMixins } from "../utils";
import { Context } from "./context";
import { CloneMixin } from "./mixins";

interface BusinessConnectionContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramBusinessConnection;
	updateId: number;
}

/** This object  Describes the connection of the bot with a business account. */
class BusinessConnectionContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramBusinessConnection;

	constructor(options: BusinessConnectionContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "business_connection",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface BusinessConnectionContext<Bot extends BotLike>
	extends Constructor<BusinessConnectionContext<Bot>>,
		BusinessConnection,
		CloneMixin<
			Bot,
			BusinessConnectionContext<Bot>,
			BusinessConnectionContextOptions<Bot>
		> {}
applyMixins(BusinessConnectionContext, [BusinessConnection, CloneMixin]);

export { BusinessConnectionContext };

inspectable(BusinessConnectionContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: BusinessConnectionContext<any>) {
		return context;
	},
});
