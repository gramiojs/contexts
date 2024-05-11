import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { PollAnswer } from "../structures";
import type { Constructor, Require } from "../types";
import { applyMixins } from "../utils";

import type { BotLike } from "../types";
import { Context } from "./context";
import { ChatActionMixin, CloneMixin, SendMixin } from "./mixins/index";

interface PollAnswerContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramPollAnswer;
	updateId: number;
}

class PollAnswerContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramPollAnswer;

	constructor(options: PollAnswerContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "poll_answer",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Checks whether the current answer was non-anonymous and contains `user` field */
	isFromUser(): this is Require<this, "user"> {
		return this.user !== undefined;
	}

	/** Checks if current answer was answered anonymously and the `voterChat` is available */
	isFromChat(): this is Require<this, "voterChat"> {
		return this.voterChat !== undefined;
	}
}

// @ts-expect-error [senderId: number] is not compatible with [senderId: number | undefined] :shrug:
interface PollAnswerContext<Bot extends BotLike>
	extends Constructor<PollAnswerContext<Bot>>,
		PollAnswer,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		CloneMixin<Bot, PollAnswerContext<Bot>, PollAnswerContextOptions<Bot>> {}
applyMixins(PollAnswerContext, [
	PollAnswer,
	SendMixin,
	ChatActionMixin,
	CloneMixin,
]);

inspectable(PollAnswerContext, {
	serialize(context) {
		return {
			pollId: context.pollId,
			user: context.user,
			senderId: context.senderId,
			optionIds: context.optionIds,
		};
	},
});

export { PollAnswerContext };
