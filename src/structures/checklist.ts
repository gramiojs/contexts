import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { ChecklistTask } from "./checklist-task";
import { MessageEntity } from "./message-entity";

/**
 * Describes a checklist.
 *
 * [Documentation](https://core.telegram.org/bots/api/#checklist)
 */
@Inspectable()
export class Checklist {
	constructor(public payload: TelegramObjects.TelegramChecklist) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Title of the checklist
	 */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/**
	 * *Optional*. Special entities that appear in the checklist title
	 */
	@Inspect()
	get titleEntities() {
		return this.payload.title_entities?.map(
			(entity) => new MessageEntity(entity),
		);
	}

	/**
	 * List of tasks in the checklist
	 */
	@Inspect()
	get tasks() {
		return this.payload.tasks.map((task) => new ChecklistTask(task));
	}

	/**
	 * *Optional*. *True*, if users other than the creator of the list can add tasks to the list
	 */
	@Inspect()
	get othersCanAddTasks() {
		return this.payload.others_can_add_tasks;
	}

	/**
	 * *Optional*. *True*, if users other than the creator of the list can mark tasks as done or not done
	 */
	@Inspect()
	get othersCanMarkTasksAsDone() {
		return this.payload.others_can_mark_tasks_as_done;
	}
}

memoizeGetters(Checklist, ["titleEntities", "tasks"]);
