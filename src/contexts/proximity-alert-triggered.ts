import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Message, ProximityAlertTriggered } from "../structures/index";

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
} from "./mixins";

interface ProximityAlertTriggeredContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class ProximityAlertTriggeredContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: ProximityAlertTriggeredContextOptions<Bot>) {
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

interface ProximityAlertTriggeredContext<Bot extends BotLike>
	extends Constructor<ProximityAlertTriggeredContext<Bot>>,
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
		CloneMixin<
			Bot,
			ProximityAlertTriggeredContext<Bot>,
			ProximityAlertTriggeredContextOptions<Bot>
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
