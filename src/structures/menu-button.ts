import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import type { JoinUnion } from "../types";
import { memoizeGetters } from "../utils";
import { WebAppInfo } from "./web-app-info";

/** This object describes the bot's menu button in a private chat. */
@Inspectable()
export class MenuButton {
	constructor(public payload: JoinUnion<TelegramObjects.TelegramMenuButton>) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Type of the button */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/** Text on the button */
	@Inspect()
	get text() {
		return this.payload.text;
	}

	/**
	 * Description of the Web App that will be launched when the user presses the button.
	 * The Web App will be able to send an arbitrary message on behalf of the user
	 * using the method `answerWebAppQuery`.
	 */
	@Inspect({ nullable: false })
	get webApp() {
		const { web_app } = this.payload;

		if (!web_app) return undefined;

		return new WebAppInfo(web_app);
	}
}

memoizeGetters(MenuButton, ["webApp"]);
