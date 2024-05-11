import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import { InlineKeyboardMarkup } from "./inline-keyboard-markup";

/**
 * Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the location.
 *
 * [Documentation](https://core.telegram.org/bots/api/#inlinequeryresultlocation)
 */
@Inspectable()
export class InlineQueryResultLocation {
	constructor(
		public payload: TelegramObjects.TelegramInlineQueryResultLocation,
	) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the result, must be *location*
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/**
	 * Unique identifier for this result, 1-64 Bytes
	 */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/**
	 * Location latitude in degrees
	 */
	@Inspect()
	get latitude() {
		return this.payload.latitude;
	}

	/**
	 * Location longitude in degrees
	 */
	@Inspect()
	get longitude() {
		return this.payload.longitude;
	}

	/**
	 * Location title
	 */
	@Inspect()
	get title() {
		return this.payload.title;
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

	/**
	 * *Optional*. [Inline keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to the message
	 */
	@Inspect()
	get replyMarkup() {
		return this.payload.reply_markup
			? new InlineKeyboardMarkup(
					"toJSON" in this.payload.reply_markup
						? this.payload.reply_markup.toJSON()
						: this.payload.reply_markup,
				)
			: undefined;
	}

	/**
	 * *Optional*. Content of the message to be sent instead of the location
	 */
	@Inspect()
	get inputMessageContent() {
		return this.payload.input_message_content;
	}

	/**
	 * *Optional*. Url of the thumbnail for the result
	 */
	@Inspect()
	get thumbnailUrl() {
		return this.payload.thumbnail_url;
	}

	/**
	 * *Optional*. Thumbnail width
	 */
	@Inspect()
	get thumbnailWidth() {
		return this.payload.thumbnail_width;
	}

	/**
	 * *Optional*. Thumbnail height
	 */
	@Inspect()
	get thumbnailHeight() {
		return this.payload.thumbnail_height;
	}
}
memoizeGetters(InlineQueryResultLocation, ["replyMarkup"]);
