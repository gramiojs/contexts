import type { TelegramObjects } from "@gramio/types";
import { Inspectable } from "inspectable";

/**
 * This object represents a service message about a chat being removed from a
 * community. Currently holds no information.
 *
 * [Documentation](https://core.telegram.org/bots/api/#communitychatremoved)
 */
@Inspectable()
export class CommunityChatRemoved {
	constructor(public payload: TelegramObjects.TelegramCommunityChatRemoved) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
