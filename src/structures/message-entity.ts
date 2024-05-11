import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { User } from "./user";

/**
 * This object represents one special entity in a text message.
 * For example, hashtags, usernames, URLs, etc.
 */
@Inspectable()
export class MessageEntity {
	constructor(public payload: TelegramObjects.TelegramMessageEntity) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Type of the entity.
	 *
	 * Can be `mention` (`@username`), `hashtag` (`#hashtag`), `cashtag`
	 * (`$USD`), `bot_command` (`/start@jobs_bot`), `url`
	 * (`https://telegram.org`), `email` (`do-not-reply@telegram.org`),
	 * `phone_number` (`+1-212-555-0123`), `bold` (**bold text**), `italic`
	 * (_italic text_), `underline` (underlined text), `strikethrough`
	 * (~~strikethrough text~~), “spoiler” (spoiler message), `code` (`monowidth string`),
	 * `pre` (`monowidth block`), `text_link` (for clickable text URLs), `text_mention`
	 * (for users without usernames)
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/** Offset in UTF-16 code units to the start of the entity */
	@Inspect()
	get offset() {
		return this.payload.offset;
	}

	/** Length of the entity in UTF-16 code units */
	@Inspect()
	get length() {
		return this.payload.length;
	}

	/**
	 * For `text_link` only, url that will be opened after user taps on the text
	 */
	@Inspect({ nullable: false })
	get url() {
		return this.payload.url;
	}

	/** For `text_mention` only, the mentioned user */
	@Inspect({ nullable: false })
	get user() {
		const { user } = this.payload;

		if (!user) return undefined;

		return new User(user);
	}

	/** For `pre` only, the programming language of the entity text */
	@Inspect({ nullable: false })
	get language() {
		return this.payload.language;
	}

	/**
	 * For `custom_emoji` only, unique identifier of the custom emoji.
	 *
	 * Use `getCustomEmojiStickers` to get full information about the sticker
	 */
	@Inspect({ nullable: false })
	get customEmojiId() {
		return this.payload.custom_emoji_id;
	}
}

memoizeGetters(MessageEntity, ["user"]);
