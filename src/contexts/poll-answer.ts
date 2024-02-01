import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

import type { Bot } from "gramio";
import { applyMixins } from "#utils";
import type { Constructor, Require } from "#utils";
import { PollAnswer } from "../structures";

import { Context } from "./context";
import { ChatActionMixin, CloneMixin, SendMixin } from "./mixins";

interface PollAnswerContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramPollAnswer;
	updateId: number;
}

class PollAnswerContext extends Context {
	payload: Interfaces.TelegramPollAnswer;

	constructor(options: PollAnswerContextOptions) {
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
interface PollAnswerContext
	extends Constructor<PollAnswerContext>,
		PollAnswer,
		SendMixin,
		ChatActionMixin,
		CloneMixin<PollAnswerContext, PollAnswerContextOptions> {}
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
