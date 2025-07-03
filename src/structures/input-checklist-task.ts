import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { MessageEntity } from "./message-entity";

/**
 * Describes a task to add to a checklist.
 *
 * [Documentation](https://core.telegram.org/bots/api/#inputchecklisttask)
 */
@Inspectable()
export class InputChecklistTask {
	constructor(public payload: TelegramObjects.TelegramInputChecklistTask) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Unique identifier of the task; must be positive and unique among all task identifiers currently present in the checklist
	 */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/**
	 * Text of the task; 1-100 characters after entities parsing
	 */
	@Inspect()
	get text() {
		return this.payload.text;
	}

	/**
	 * Optional. Mode for parsing entities in the text. See [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.
	 */
	@Inspect()
	get parseMode() {
		return this.payload.parse_mode;
	}

	/**
	 * *Optional*. List of special entities that appear in the text, which can be specified instead of parse\_mode. Currently, only *bold*, *italic*, *underline*, *strikethrough*, *spoiler*, and *custom\_emoji* entities are allowed.
	 */
	@Inspect()
	get textEntities() {
		return this.payload.text_entities?.map(
			(entity) => new MessageEntity(entity),
		);
	}
}

memoizeGetters(InputChecklistTask, ["textEntities"]);
