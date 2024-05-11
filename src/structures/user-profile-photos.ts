import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { PhotoSize } from "./photo-size";

/** This object represent a user's profile pictures. */
@Inspectable()
export class UserProfilePhotos {
	constructor(public payload: TelegramObjects.TelegramUserProfilePhotos) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Total number of profile pictures the target user has */
	@Inspect()
	get totalCount() {
		return this.payload.total_count;
	}

	/** Requested profile pictures (in up to 4 sizes each) */
	@Inspect({ nullable: false })
	get photos() {
		const { photos } = this.payload;

		if (!photos.length) return undefined;

		return photos.map((row) => row.map((element) => new PhotoSize(element)));
	}
}
