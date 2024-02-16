import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";
import { Message, ProximityAlertTriggered } from "../structures";

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

interface ProximityAlertTriggeredContextOptions {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class ProximityAlertTriggeredContext extends Context {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: ProximityAlertTriggeredContextOptions) {
		super({
			bot: options.bot,
			updateType: "proximity_alert_triggered",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/**
	 * Service message.
	 * A user in the chat triggered another user's proximity alert
	 * while sharing Live Location.
	 */
	get proximityAlert() {
		return new ProximityAlertTriggered(
			this.payload
				.proximity_alert_triggered as TelegramObjects.TelegramProximityAlertTriggered,
		);
	}
}

interface ProximityAlertTriggeredContext
	extends Constructor<ProximityAlertTriggeredContext>,
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
		CloneMixin<
			ProximityAlertTriggeredContext,
			ProximityAlertTriggeredContextOptions
		> {}
applyMixins(ProximityAlertTriggeredContext, [
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
memoizeGetters(ProximityAlertTriggeredContext, ["proximityAlert"]);

inspectable(ProximityAlertTriggeredContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			proximityAlert: context.proximityAlert,
		};
	},
});

export { ProximityAlertTriggeredContext };
