import type { TelegramObjects } from "@gramio/types";
import { Inspect, inspectable } from "inspectable";

import { Message } from "../structures/message";
import type { BotLike } from "../types";
import type { Constructor } from "../types";
import { applyMixins } from "../utils";
import { Context } from "./context";
import {
    ChatActionMixin,
    ChatControlMixin,
    ChatInviteControlMixin,
    ChatMemberControlMixin,
    ChatSenderControlMixin,
    CloneMixin,
    ForumMixin,
    NodeMixin,
    PinsMixin,
    SendMixin,
    TargetMixin,
} from "./mixins/index";

interface GiveawayCreatedContextOptions<Bot extends BotLike> {
    bot: Bot;
    update: TelegramObjects.TelegramUpdate;
    payload: TelegramObjects.TelegramMessage;
    updateId: number;
}

/** This object represents a service message about the creation of a scheduled giveaway. */
class GiveawayCreatedContext<Bot extends BotLike> extends Context<Bot> {
    /** The raw data that is used for this Context */
    payload: TelegramObjects.TelegramMessage;

    constructor(options: GiveawayCreatedContextOptions<Bot>) {
        super({
            bot: options.bot,
            updateType: "giveaway_created",
            updateId: options.updateId,
            update: options.update,
        });

        this.payload = options.payload;
    }

    @Inspect()
    get eventGiveaway() {
        return this.giveawayCreated!;
    }
}

interface GiveawayCreatedContext<Bot extends BotLike>
    extends Constructor<GiveawayCreatedContext<Bot>>,
        Message,
        TargetMixin,
        SendMixin<Bot>,
        ChatActionMixin<Bot>,
        NodeMixin<Bot>,
        ForumMixin<Bot>,
        ChatInviteControlMixin<Bot>,
        ChatControlMixin<Bot>,
        ChatSenderControlMixin<Bot>,
        ChatMemberControlMixin<Bot>,
        PinsMixin<Bot>,
        CloneMixin<
            Bot,
            GiveawayCreatedContext<Bot>,
            GiveawayCreatedContextOptions<Bot>
        > {}
applyMixins(GiveawayCreatedContext, [
    Message,
    TargetMixin,
    SendMixin,
    ChatActionMixin,
    NodeMixin,
    ForumMixin,
    ChatInviteControlMixin,
    ChatControlMixin,
    ChatSenderControlMixin,
    ChatMemberControlMixin,
    PinsMixin,
    CloneMixin,
]);

export { GiveawayCreatedContext };

inspectable(GiveawayCreatedContext, {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    serialize(context: GiveawayCreatedContext<any>) {
        return {
            id: context.id,
            createdAt: context.createdAt,
            chat: context.chat,
            chatId: context.chatId,
            chatType: context.chatType,
        };
    },
});
