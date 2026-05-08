import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";
import { memoizeGetters } from "../utils";
import {
	AnimationAttachment,
	AudioAttachment,
	DocumentAttachment,
	LivePhotoAttachment,
	StickerAttachment,
	VideoAttachment,
} from "./attachments/index";
import { Location } from "./location";
import { PhotoSize } from "./photo-size";
import { Venue } from "./venue";

/**
 * Describes media attached to a poll, poll option, or quiz explanation.
 *
 * [Documentation](https://core.telegram.org/bots/api/#pollmedia)
 */
@Inspectable()
export class PollMedia {
	constructor(public payload: TelegramObjects.TelegramPollMedia) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Media is an animation, information about the animation */
	@Inspect({ nullable: false })
	get animation() {
		const { animation } = this.payload;

		if (!animation) return undefined;

		return new AnimationAttachment(animation);
	}

	/** Media is an audio file, information about the file */
	@Inspect({ nullable: false })
	get audio() {
		const { audio } = this.payload;

		if (!audio) return undefined;

		return new AudioAttachment(audio);
	}

	/** Media is a general file, information about the file */
	@Inspect({ nullable: false })
	get document() {
		const { document } = this.payload;

		if (!document) return undefined;

		return new DocumentAttachment(document);
	}

	/** Media is a live photo, information about the live photo */
	@Inspect({ nullable: false })
	get livePhoto() {
		const { live_photo } = this.payload;

		if (!live_photo) return undefined;

		return new LivePhotoAttachment(live_photo);
	}

	/** Media is a shared location, information about the location */
	@Inspect({ nullable: false })
	get location() {
		const { location } = this.payload;

		if (!location) return undefined;

		return new Location(location);
	}

	/** Media is a photo, available sizes of the photo */
	@Inspect({ nullable: false })
	get photo() {
		const { photo } = this.payload;

		if (!photo) return undefined;

		return photo.map((size) => new PhotoSize(size));
	}

	/** Media is a sticker, information about the sticker */
	@Inspect({ nullable: false })
	get sticker() {
		const { sticker } = this.payload;

		if (!sticker) return undefined;

		return new StickerAttachment(sticker);
	}

	/** Media is a venue, information about the venue */
	@Inspect({ nullable: false })
	get venue() {
		const { venue } = this.payload;

		if (!venue) return undefined;

		return new Venue(venue);
	}

	/** Media is a video, information about the video */
	@Inspect({ nullable: false })
	get video() {
		const { video } = this.payload;

		if (!video) return undefined;

		return new VideoAttachment(video);
	}
}

memoizeGetters(PollMedia, [
	"animation",
	"audio",
	"document",
	"livePhoto",
	"location",
	"sticker",
	"venue",
	"video",
]);
