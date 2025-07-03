import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { Message } from "./message";

/**
 * Describes a service message about tasks added to a checklist.
 *
 * [Documentation](https://core.telegram.org/bots/api/#checklisttasksadded)
 */
@Inspectable()
export class ChecklistTasksAdded {
	constructor(public payload: TelegramObjects.TelegramChecklistTasksAdded) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *Optional*. Message containing the checklist to which the tasks were added. Note that the Message object in this field will not contain the *reply\_to\_message* field even if it itself is a reply.
	 */
	@Inspect()
	get checklistMessage(): Message | undefined {
		return this.payload.checklist_message
			? new Message(this.payload.checklist_message)
			: undefined;
	}

	/**
	 * List of tasks added to the checklist
	 */
	@Inspect()
	get tasks() {
		return this.payload.tasks;
	}
}
memoizeGetters(ChecklistTasksAdded, ["checklistMessage"]);
