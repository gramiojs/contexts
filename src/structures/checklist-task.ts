import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { Chat } from "./chat";
import { MessageEntity } from "./message-entity";
import { User } from "./user";

/**
 * Describes a task in a checklist.
 *
 * [Documentation](https://core.telegram.org/bots/api/#checklisttask)
 */
@Inspectable()
export class ChecklistTask {
	constructor(public payload: TelegramObjects.TelegramChecklistTask) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Unique identifier of the task
	 */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/**
	 * Text of the task
	 */
	@Inspect()
	get text() {
		return this.payload.text;
	}

	/**
	 * *Optional*. Special entities that appear in the task text
	 */
	@Inspect()
	get textEntities() {
		return this.payload.text_entities?.map(
			(entity) => new MessageEntity(entity),
		);
	}

	/**
	 * *Optional*. User that completed the task; omitted if the task wasn't completed
	 */
	@Inspect()
	get completedByUser() {
		return this.payload.completed_by_user
			? new User(this.payload.completed_by_user)
			: undefined;
	}

	/**
	 * *Optional*. Chat that completed the task; omitted if the task wasn't completed by a chat
	 */
	@Inspect()
	get completedByChat() {
		return this.payload.completed_by_chat
			? new Chat(this.payload.completed_by_chat)
			: undefined;
	}

	/**
	 * *Optional*. Point in time (Unix timestamp) when the task was completed; 0 if the task wasn't completed
	 */
	@Inspect()
	get completionDate() {
		return this.payload.completion_date
			? new Date(this.payload.completion_date * 1000)
			: undefined;
	}
}
memoizeGetters(ChecklistTask, [
	"completedByUser",
	"completedByChat",
	"textEntities",
]);
