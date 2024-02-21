import { TelegramObjects } from "@gramio/types";
import { Message } from "../structures";

import { type Constructor } from "#types";
import { applyMixins } from "#utils";

import { inspectable } from "inspectable";
import { BotLike } from "#types";
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
} from "./mixins";

interface BoostAddedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
class BoostAddedContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: BoostAddedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "boost_added",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}
}

interface BoostAddedContext<Bot extends BotLike>
	extends Constructor<BoostAddedContext<Bot>>,
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
		CloneMixin<Bot, BoostAddedContext<Bot>, BoostAddedContextOptions<Bot>> {}
applyMixins(BoostAddedContext, [
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

inspectable(BoostAddedContext, {
	serialize(context) {
		return {};
	},
});

export { BoostAddedContext };