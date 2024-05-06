import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * This object contains information about one answer option in a poll to send.
 *
 * [Documentation](https://core.telegram.org/bots/api/#inputpolloption)
 */
@Inspectable()
export class InputPollOption {
	constructor(public payload: TelegramObjects.TelegramInputPollOption) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Option text, 1-100 characters
	 */
	@Inspect()
	get text() {
		return this.payload.text;
	}

	/**
	 * *Optional*. Mode for parsing entities in the text. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. Currently, only custom emoji entities are allowed
	 */
	@Inspect()
	get textParseMode() {
		return this.payload.text_parse_mode;
	}

	/**
	 * *Optional*. A JSON-serialized list of special entities that appear in the poll option text. It can be specified instead of *text\_parse\_mode*
	 */
	@Inspect()
	get textEntities() {
		return this.payload.text_entities;
	}
}
