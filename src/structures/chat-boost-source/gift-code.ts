import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

import { User } from "../user";

import { memoizeGetters } from "../../utils";
import { ChatBoostSource } from "./chat-boost-source";

/** The boost was obtained by the creation of Telegram Premium gift codes to boost a chat. Each such code boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription. */
@Inspectable()
export class ChatBoostSourceGiftCode extends ChatBoostSource {
	constructor(public payload: TelegramObjects.TelegramChatBoostSourceGiftCode) {
		super(payload);
	}

	/** Source of the boost, always `gift_code` */
	@Inspect()
	get source() {
		return this.payload.source;
	}

	/** User for which the gift code was created */
	@Inspect()
	get user() {
		return new User(this.payload.user);
	}
}

memoizeGetters(ChatBoostSourceGiftCode, ["user"]);
