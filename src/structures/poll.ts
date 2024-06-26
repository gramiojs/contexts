import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";

import { memoizeGetters } from "../utils";
import { MessageEntity } from "./message-entity";
import { PollOption } from "./poll-option";

/** This object contains information about a poll. */
@Inspectable()
export class Poll {
	constructor(public payload: TelegramObjects.TelegramPoll) {}

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Unique poll identifier */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/** Poll question, `1-300` characters */
	@Inspect()
	get question() {
		return this.payload.question;
	}

	/**
	 * *Optional*. Special entities that appear in the *question*. Currently, only custom emoji entities are allowed in poll questions
	 */
	@Inspect({ nullable: false })
	get questionEntities() {
		return this.payload.question_entities
			? this.payload.question_entities.map((x) => new MessageEntity(x))
			: undefined;
	}

	/** List of poll options */
	@Inspect()
	get options() {
		return this.payload.options.map((option) => new PollOption(option));
	}

	/** Total number of users that voted in the poll */
	@Inspect()
	get totalVoterCount() {
		return this.payload.total_voter_count;
	}

	/** `true`, if the poll is closed */
	@Inspect({ compute: true })
	isClosed() {
		return this.payload.is_closed;
	}

	/** `true`, if the poll is anonymous */
	@Inspect({ compute: true })
	isAnonymous() {
		return this.payload.is_anonymous;
	}

	/** Poll type, currently can be `regular` or `quiz` */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/** `true`, if the poll allows multiple answers */
	@Inspect()
	get allowsMultipleAnswers() {
		return this.payload.allows_multiple_answers;
	}

	/**
	 * 0-based identifier of the correct answer option. Available only for polls
	 * in the quiz mode, which are closed, or was sent (not forwarded) by the bot
	 * or to the private chat with the bot.
	 */
	@Inspect({ nullable: false })
	get correctOptionId() {
		return this.payload.correct_option_id;
	}

	/**
	 * Text that is shown when a user chooses an incorrect answer or taps on the
	 * lamp icon in a quiz-style poll, 0-200 characters
	 */
	@Inspect({ nullable: false })
	get explanation() {
		return this.payload.explanation;
	}

	/**
	 * Special entities like usernames, URLs, bot commands, etc. that appear in
	 * the explanation
	 */
	@Inspect({ nullable: false })
	get explanationEntities() {
		const { explanation_entities } = this.payload;

		if (!explanation_entities) return undefined;

		return explanation_entities.map((entity) => new MessageEntity(entity));
	}

	/** Amount of time in seconds the poll will be active after creation */
	@Inspect({ nullable: false })
	get openPeriod() {
		return this.payload.open_period;
	}

	/**
	 * Point in time (Unix timestamp) when the poll will be automatically closed
	 */
	@Inspect({ nullable: false })
	get closeDate() {
		return this.payload.close_date;
	}
}

memoizeGetters(Poll, ["explanationEntities"]);
