import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a location message to be sent as the result of an inline query.
 *
 * [Documentation](https://core.telegram.org/bots/api/#inputlocationmessagecontent)
 */
@Inspectable()
export class InputLocationMessageContent {
	constructor(
		public payload: TelegramObjects.TelegramInputLocationMessageContent,
	) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Latitude of the location in degrees
	 */
	@Inspect()
	get latitude() {
		return this.payload.latitude;
	}

	/**
	 * Longitude of the location in degrees
	 */
	@Inspect()
	get longitude() {
		return this.payload.longitude;
	}

	/**
	 * *Optional*. The radius of uncertainty for the location, measured in meters; 0-1500
	 */
	@Inspect()
	get horizontalAccuracy() {
		return this.payload.horizontal_accuracy;
	}

	/**
	 * *Optional*. Period in seconds during which the location can be updated, should be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely.
	 */
	@Inspect()
	get livePeriod() {
		return this.payload.live_period;
	}

	/**
	 * *Optional*. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
	 */
	@Inspect()
	get heading() {
		return this.payload.heading;
	}

	/**
	 * *Optional*. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
	 */
	@Inspect()
	get proximityAlertRadius() {
		return this.payload.proximity_alert_radius;
	}
}
