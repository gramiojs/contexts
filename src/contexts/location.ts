import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Location, Message } from "../structures";

import type { Constructor } from "../types";
import { applyMixins, memoizeGetters } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import {
	ChatActionMixin,
	ChatControlMixin,
	ChatInviteControlMixin,
	ChatMemberControlMixin,
	ChatSenderControlMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins/index";

interface LocationContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class LocationContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: LocationContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "location",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Location */
	get eventLocation() {
		return new Location(
			this.payload.location as TelegramObjects.TelegramLocation,
		);
	}
}

interface LocationContext<Bot extends BotLike>
	extends Constructor<LocationContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		ChatInviteControlMixin<Bot>,
		ChatControlMixin<Bot>,
		ChatSenderControlMixin<Bot>,
		ChatMemberControlMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<Bot, LocationContext<Bot>, LocationContextOptions<Bot>> {}
applyMixins(LocationContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	ChatInviteControlMixin,
	ChatControlMixin,
	ChatSenderControlMixin,
	ChatMemberControlMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(LocationContext, ["eventLocation"]);

inspectable(LocationContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventLocation: context.eventLocation,
		};
	},
});

export { LocationContext };
