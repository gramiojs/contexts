import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";
import { Location, Message } from "../structures";

import type { Bot } from "gramio";
import { applyMixins, memoizeGetters } from "#utils";
import { type Constructor } from "#utils";

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
} from "./mixins";

interface LocationContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramMessage;
	updateId: number;
}

class LocationContext extends Context {
	payload: Interfaces.TelegramMessage;

	constructor(options: LocationContextOptions) {
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
		return new Location(this.payload.location as Interfaces.TelegramLocation);
	}
}

interface LocationContext
	extends Constructor<LocationContext>,
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
		CloneMixin<LocationContext, LocationContextOptions> {}
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
