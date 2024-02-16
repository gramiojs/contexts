import { Inspect, Inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

import { AnimationAttachment } from "./attachments";

import { memoizeGetters } from "#utils";
import { MessageEntity } from "./message-entity";
import { PhotoSize } from "./photo-size";

/** This object represents a game. */
@Inspectable()
export class Game {
	constructor(public payload: TelegramObjects.TelegramGame) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Title of the game */
	@Inspect()
	get title() {
		return this.payload.title;
	}

	/** Description of the game */
	@Inspect()
	get description() {
		return this.payload.description;
	}

	/** Photo that will be displayed in the game message in chats. */
	@Inspect({ nullable: false })
	get photo() {
		const { photo } = this.payload;

		if (!photo) return undefined;

		return photo.map((element) => new PhotoSize(element));
	}

	/**
	 * Brief description of the game or high scores included in the game message
	 * Can be automatically edited to include current high scores for the game
	 * when the bot calls `setGameScore`, or manually edited using
	 * `editMessageText`. 0-4096 characters.
	 */
	@Inspect({ nullable: false })
	get text() {
		return this.payload.text;
	}

	/**
	 * Special entities that appear in text, such as usernames, URLs, bot
	 * commands, etc.
	 */
	@Inspect({ nullable: false })
	get textEntities() {
		const { text_entities } = this.payload;

		if (!text_entities) return undefined;

		return text_entities.map((entity) => new MessageEntity(entity));
	}

	/**
	 * Animation that will be displayed in the game message in chats.
	 * Upload via BotFather
	 */
	@Inspect({ nullable: false })
	get animation() {
		const { animation } = this.payload;

		if (!animation) return undefined;

		return new AnimationAttachment(animation);
	}
}

memoizeGetters(Game, ["textEntities", "animation"]);
