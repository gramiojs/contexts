import type { TelegramObjects, TelegramParams } from "@gramio/types";
import { inspectable } from "inspectable";
import { User } from "../structures/user";
import type { BotLike, Constructor, Optional } from "../types";
import { applyMixins, memoizeGetters } from "../utils";
import { Context } from "./context";
import { CloneMixin } from "./mixins/index";

interface ManagedBotContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramManagedBotUpdated;
	updateId: number;
}

/** This object represents a new bot created to be managed by the current bot, or a bot whose token was changed. */
class ManagedBotContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramManagedBotUpdated;

	constructor(options: ManagedBotContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "managed_bot",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** User that created the bot */
	get user() {
		return new User(this.payload.user);
	}

	/**
	 * Information about the bot. Token of the bot can be fetched using the method `getManagedBotToken`.
	 */
	get managedBot() {
		return new User(this.payload.bot);
	}

	/** Returns the token of the managed bot created by this user */
	getManagedBotToken(
		params?: Optional<TelegramParams.GetManagedBotTokenParams, "user_id">,
	) {
		return this.bot.api.getManagedBotToken({
			user_id: this.payload.user.id,
			...params,
		});
	}

	/** Revokes the current token of the managed bot created by this user and generates a new one */
	replaceManagedBotToken(
		params?: Optional<TelegramParams.ReplaceManagedBotTokenParams, "user_id">,
	) {
		return this.bot.api.replaceManagedBotToken({
			user_id: this.payload.user.id,
			...params,
		});
	}
}

interface ManagedBotContext<Bot extends BotLike>
	extends Constructor<ManagedBotContext<Bot>>,
		CloneMixin<Bot, ManagedBotContext<Bot>, ManagedBotContextOptions<Bot>> {}
applyMixins(ManagedBotContext, [CloneMixin]);

memoizeGetters(ManagedBotContext, ["user", "managedBot"]);

export { ManagedBotContext };

inspectable(ManagedBotContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: ManagedBotContext<any>) {
		return {
			user: context.user,
			managedBot: context.managedBot,
		};
	},
});
