import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "#utils";
import { User } from "./user";

/**
 * This object represents the content of a service message,
 * sent whenever a user in the chat triggers a proximity alert set by another user.
 */
@Inspectable()
export class ProximityAlertTriggered {
	constructor(
		public payload: TelegramObjects.TelegramProximityAlertTriggered,
	) {}

	/** User that triggered the alert */
	@Inspect()
	get traveler() {
		return new User(this.payload.traveler);
	}

	/** User that set the alert */
	@Inspect()
	get watcher() {
		return new User(this.payload.watcher);
	}

	/** The distance between the users */
	@Inspect()
	get distance() {
		return this.payload.distance;
	}
}

memoizeGetters(ProximityAlertTriggered, ["traveler", "watcher"]);
