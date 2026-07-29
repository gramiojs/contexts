import type { TelegramObjects } from "@gramio/types";
import { inspectable } from "inspectable";
import { User } from "../structures/user";
import type { BotLike, Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";
import { Context } from "./context";
import { CloneMixin } from "./mixins/index";

interface SubscriptionContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramBotSubscriptionUpdated;
	updateId: number;
}

/** This object contains information about changes to a user payment subscription toward the current bot. */
class SubscriptionContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramBotSubscriptionUpdated;

	constructor(options: SubscriptionContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "subscription",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** User who subscribed for payments toward the bot */
	get user() {
		return new User(this.payload.user);
	}

	/** Bot-specified invoice payload */
	get invoicePayload() {
		return this.payload.invoice_payload;
	}

	/**
	 * The new state of the subscription. Currently, it can be one of `canceled`
	 * if the user canceled the subscription, `active` if the user re-enabled a
	 * previously canceled subscription, or `failed` if payment for the
	 * subscription failed.
	 */
	get state() {
		return this.payload.state;
	}

	/** Whether the subscription was canceled by the user */
	get isCanceled() {
		return this.payload.state === "canceled";
	}

	/** Whether the subscription is active (re-enabled after a previous cancellation) */
	get isActive() {
		return this.payload.state === "active";
	}

	/** Whether payment for the subscription failed */
	get isFailed() {
		return this.payload.state === "failed";
	}
}

interface SubscriptionContext<Bot extends BotLike>
	extends Constructor<SubscriptionContext<Bot>>,
		CloneMixin<Bot, SubscriptionContext<Bot>, SubscriptionContextOptions<Bot>> {}
applyMixins(SubscriptionContext, [CloneMixin]);

memoizeGetters(SubscriptionContext, ["user"]);

export { SubscriptionContext };

inspectable(SubscriptionContext, {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serialize(context: SubscriptionContext<any>) {
		return {
			user: context.user,
			invoicePayload: context.invoicePayload,
			state: context.state,
		};
	},
});
