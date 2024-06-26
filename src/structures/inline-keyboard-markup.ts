import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { InlineKeyboardButton } from "./inline-keyboard-button";

/** This object represents an inline keyboard that appears right next to the message it belongs to. */
@Inspectable()
export class InlineKeyboardMarkup {
	constructor(public payload: TelegramObjects.TelegramInlineKeyboardMarkup) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Array of button rows */
	@Inspect()
	get inlineKeyboard() {
		const { inline_keyboard } = this.payload;

		return inline_keyboard.map((row) =>
			row.map((element) => new InlineKeyboardButton(element)),
		);
	}
}
