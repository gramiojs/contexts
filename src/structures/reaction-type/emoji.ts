import type { TelegramObjects } from "@gramio/types";

import { ReactionType } from "./reaction-type";

/**
 * The reaction is based on an emoji.
 *
 * [Documentation](https://core.telegram.org/bots/api/#reactiontypeemoji)
 */
export class ReactionTypeEmoji extends ReactionType {
	constructor(public payload: TelegramObjects.TelegramReactionTypeEmoji) {
		super(payload);
	}

	/** Type of the reaction, always `emoji` */
	get type() {
		return this.payload.type;
	}

	/** Reaction emoji. Currently, it can be one of "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡" */
	get emoji() {
		return this.payload.emoji;
	}
}
