import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import { inspectable } from "inspectable";
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

interface ChecklistTasksDoneContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about checklist tasks done. */
class ChecklistTasksDoneContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	event: TelegramObjects.TelegramChecklistTasksDone;

	constructor(options: ChecklistTasksDoneContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "checklist_tasks_done",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = options.payload.checklist_tasks_done!;
	}

	/**
	 * *Optional*. Message containing the checklist whose tasks were marked as done or not done. Note that the Message object in this field will not contain the *reply\_to\_message* field even if it itself is a reply.
	 */
	get checklistMessage() {
		return this.event.checklist_message
			? new Message(this.event.checklist_message)
			: undefined;
	}
	/**
	 * *Optional*. Identifiers of the tasks that were marked as done
	 */
	get markedAsDoneTaskIds() {
		return this.event.marked_as_done_task_ids;
	}

	/**
	 * *Optional*. Identifiers of the tasks that were marked as not done
	 */
	get markedAsNotDoneTaskIds() {
		return this.event.marked_as_not_done_task_ids;
	}
}

interface ChecklistTasksDoneContext<Bot extends BotLike>
	extends Constructor<ChecklistTasksDoneContext<Bot>>,
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
			ChecklistTasksDoneContext<Bot>,
			ChecklistTasksDoneContextOptions<Bot>
		> {}
applyMixins(ChecklistTasksDoneContext, [
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

inspectable(ChecklistTasksDoneContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			checklistMessage: context.checklistMessage,
			markedAsDoneTaskIds: context.markedAsDoneTaskIds,
			markedAsNotDoneTaskIds: context.markedAsNotDoneTaskIds,
		};
	},
});

export { ChecklistTasksDoneContext };
