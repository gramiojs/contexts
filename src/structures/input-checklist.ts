import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { InputChecklistTask } from "./input-checklist-task";
import { MessageEntity } from "./message-entity";

/**
 * Describes a checklist to create.
 *
 * [Documentation](https://core.telegram.org/bots/api/#inputchecklist)
 */
@Inspectable()
export class InputChecklist {
	constructor(public payload: TelegramObjects.TelegramInputChecklist) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Title of the checklist; 1-255 characters after entities parsing
	 */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/**
	 * Optional. Mode for parsing entities in the title. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
	 */
	@Inspect()
	get parseMode() {
		return this.payload.parse_mode;
	}

	/**
	 * *Optional*. List of special entities that appear in the title, which can be specified instead of parse\_mode. Currently, only *bold*, *italic*, *underline*, *strikethrough*, *spoiler*, and *custom\_emoji* entities are allowed.
	 */
	@Inspect()
	get titleEntities() {
		return this.payload.title_entities?.map(
			(entity) => new MessageEntity(entity),
		);
	}

	/**
	 * List of 1-30 tasks in the checklist
	 */
	@Inspect()
	get tasks() {
		return this.payload.tasks.map((task) => new InputChecklistTask(task));
	}

	/**
	 * *Optional*. Pass *True* if other users can add tasks to the checklist
	 */
	@Inspect()
	get othersCanAddTasks() {
		return this.payload.others_can_add_tasks;
	}

	/**
	 * *Optional*. Pass *True* if other users can mark tasks as done or not done in the checklist
	 */
	@Inspect()
	get othersCanMarkTasksAsDone() {
		return this.payload.others_can_mark_tasks_as_done;
	}
}

memoizeGetters(InputChecklist, ["titleEntities", "tasks"]);
