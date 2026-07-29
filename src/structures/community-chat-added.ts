import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { memoizeGetters } from "../utils";
import { Community } from "./community";

/**
 * This object represents a service message about a chat being added to a community.
 *
 * [Documentation](https://core.telegram.org/bots/api/#communitychatadded)
 */
@Inspectable()
export class CommunityChatAdded {
	constructor(public payload: TelegramObjects.TelegramCommunityChatAdded) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The new community to which the chat belongs */
	@Inspect()
	get community() {
		return new Community(this.payload.community);
	}
}

memoizeGetters(CommunityChatAdded, ["community"]);
