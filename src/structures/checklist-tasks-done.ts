import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { Message } from "./message";

/**
 * Describes a service message about checklist tasks marked as done or not done.
 *
 * [Documentation](https://core.telegram.org/bots/api/#checklisttasksdone)
 */
@Inspectable()
export class ChecklistTasksDone {
	constructor(public payload: TelegramObjects.TelegramChecklistTasksDone) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * *Optional*. Message containing the checklist whose tasks were marked as done or not done. Note that the Message object in this field will not contain the *reply\_to\_message* field even if it itself is a reply.
	 */
	@Inspect()
	get checklistMessage(): Message | undefined {
		return this.payload.checklist_message
			? new Message(this.payload.checklist_message)
			: undefined;
	}

	/**
	 * *Optional*. Identifiers of the tasks that were marked as done
	 */
	@Inspect()
	get markedAsDoneTaskIds() {
		return this.payload.marked_as_done_task_ids;
	}

	/**
	 * *Optional*. Identifiers of the tasks that were marked as not done
	 */
	@Inspect()
	get markedAsNotDoneTaskIds() {
		return this.payload.marked_as_not_done_task_ids;
	}
}
memoizeGetters(ChecklistTasksDone, ["checklistMessage"]);
