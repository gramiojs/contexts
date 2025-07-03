import type { TelegramObjects } from "@gramio/types";
import { Message } from "../structures/index";

import type { Constructor } from "../types";
import { applyMixins } from "../utils";

import { inspectable } from "inspectable";
import { ChecklistTask } from "../structures/checklist-task";
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

interface ChecklistTasksAddedContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

/** This object represents a service message about checklist tasks added. */
class ChecklistTasksAddedContext<Bot extends BotLike> extends Context<Bot> {
	/** The raw data that is used for this Context */
	payload: TelegramObjects.TelegramMessage;

	event: TelegramObjects.TelegramChecklistTasksAdded;

	constructor(options: ChecklistTasksAddedContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "checklist_tasks_added",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
		this.event = options.payload.checklist_tasks_added!;
	}

	/**
	 * *Optional*. Message containing the checklist to which the tasks were added. Note that the Message object in this field will not contain the *reply\_to\_message* field even if it itself is a reply.
	 */
	get checklistMessage() {
		return this.event.checklist_message
			? new Message(this.event.checklist_message)
			: undefined;
	}
	/**
	 * List of tasks added to the checklist
	 */
	get tasks() {
		return this.event.tasks.map((task) => new ChecklistTask(task));
	}
}

interface ChecklistTasksAddedContext<Bot extends BotLike>
	extends Constructor<ChecklistTasksAddedContext<Bot>>,
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
			ChecklistTasksAddedContext<Bot>,
			ChecklistTasksAddedContextOptions<Bot>
		> {}
applyMixins(ChecklistTasksAddedContext, [
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

inspectable(ChecklistTasksAddedContext, {
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
			tasks: context.tasks,
		};
	},
});

export { ChecklistTasksAddedContext };
