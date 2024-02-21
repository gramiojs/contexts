import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

import { BotLike } from "#types";
import { PollType, applyMixins, filterPayload } from "#utils";
import type { Constructor, Require, RequireValue } from "#utils";
import { Poll } from "../structures";
import { Context } from "./context";
import { CloneMixin } from "./mixins";

interface PollContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramPoll;
	updateId: number;
}

class PollContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramPoll;

	constructor(options: PollContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "poll",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Returns `true` if current poll is a regular one */
	isRegular(): this is RequireValue<this, "type", PollType.Regular> {
		return this.type === PollType.Regular;
	}

	/** Returns `true` if current poll is a quiz */
	isQuiz(): this is RequireValue<this, "type", PollType.Quiz> {
		return this.type === PollType.Quiz;
	}

	/** Checks if poll has `correctOptionId` property */
	hasCorrectOptionId(): this is Require<this, "correctOptionId"> {
		return this.correctOptionId !== undefined;
	}

	/** Checks if poll has `explanation` property */
	hasExplanation(): this is Require<this, "explanation"> {
		return this.explanation !== undefined;
	}

	/** Checks if poll has `explanationEntities` property */
	hasExplanationEntities(): this is Require<this, "explanationEntities"> {
		return this.explanationEntities !== undefined;
	}

	/** Checks if poll has `openPeriod` property */
	hasOpenPeriod(): this is Require<this, "openPeriod"> {
		return this.openPeriod !== undefined;
	}

	/** Checks if poll has `closeDate` property */
	hasCloseDate(): this is Require<this, "closeDate"> {
		return this.closeDate !== undefined;
	}
}

// TODO: why the fuck is this not a Message.poll?
interface PollContext<Bot extends BotLike>
	extends Constructor<PollContext<Bot>>,
		Poll,
		CloneMixin<Bot, PollContext<Bot>, PollContextOptions<Bot>> {}
applyMixins(PollContext, [Poll, CloneMixin]);

inspectable(PollContext, {
	serialize(context) {
		const payload = {
			id: context.id,
			question: context.question,
			options: context.options,
			totalVoterCount: context.totalVoterCount,
			isClosed: context.isClosed,
			isAnonymous: context.isAnonymous,
			type: context.type,
			allowsMultipleAnswers: context.allowsMultipleAnswers,
			correctOptionId: context.correctOptionId,
			explanation: context.explanation,
			explanationEntities: context.explanationEntities,
			openPeriod: context.openPeriod,
			closeDate: context.closeDate,
		};

		return filterPayload(payload);
	},
});

export { PollContext };
