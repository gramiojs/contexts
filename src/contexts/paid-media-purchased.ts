import { inspectable } from "inspectable";
import { User } from "../structures/user";

import type { TelegramObjects } from "@gramio/types";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import { CloneMixin, SendMixin, TargetMixin } from "./mixins/index";

interface PaidMediaPurchasedContextOptions<Bot extends BotLike> {
    bot: Bot;
    update: TelegramObjects.TelegramUpdate;
    payload: TelegramObjects.TelegramPaidMediaPurchased;
    updateId: number;
}

/**
 * This object contains information about a paid media purchase.
 *
 * [Documentation](https://core.telegram.org/bots/api#paidmediapurchased)
 */
class PaidMediaPurchasedContext<Bot extends BotLike> extends Context<Bot> {
    /** The raw data that is used for this Context */
    payload: TelegramObjects.TelegramPaidMediaPurchased;

    constructor(options: PaidMediaPurchasedContextOptions<Bot>) {
        super({
            bot: options.bot,
            updateType: "passport_data",
            updateId: options.updateId,
            update: options.update,
        });

        this.payload = options.payload;
    }

    get from() {
        return this.payload.from ? new User(this.payload?.from) : undefined;
    }

    /** Bot-specified paid media payload */
    get paidMediaPayload() {
        return this.payload.paid_media_payload;
    }
}

interface PaidMediaPurchasedContext<Bot extends BotLike>
    extends Constructor<PaidMediaPurchasedContext<Bot>>,
        TargetMixin,
        SendMixin<Bot>,
        CloneMixin<
            Bot,
            PaidMediaPurchasedContext<Bot>,
            PaidMediaPurchasedContextOptions<Bot>
        > {}
applyMixins(PaidMediaPurchasedContext, [TargetMixin, SendMixin, CloneMixin]);

inspectable(PaidMediaPurchasedContext, {
    serialize(context) {
        return {
            from: context.from,
            paidMediaPayload: context.paidMediaPayload,
        };
    },
});

export { PaidMediaPurchasedContext };
