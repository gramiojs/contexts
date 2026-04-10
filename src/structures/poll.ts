import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

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

	/** `true`, if the poll allows to change the chosen answer options */
	@Inspect()
	get allowsRevoting() {
		return this.payload.allows_revoting;
	}

	/**
	 * Array of 0-based identifiers of the correct answer options. Available only for polls
	 * in quiz mode which are closed or were sent (not forwarded) by the bot or to the
	 * private chat with the bot.
	 */
	@Inspect({ nullable: false })
	get correctOptionIds() {
		return this.payload.correct_option_ids;
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

	/**
	 * *Optional*. Description of the poll; for polls inside the Message object only
	 */
	@Inspect({ nullable: false })
	get description() {
		return this.payload.description;
	}

	/**
	 * *Optional*. Special entities like usernames, URLs, bot commands, etc. that appear in
	 * the description
	 */
	@Inspect({ nullable: false })
	get descriptionEntities() {
		const { description_entities } = this.payload;

		if (!description_entities) return undefined;

		return description_entities.map((entity) => new MessageEntity(entity));
	}
}

memoizeGetters(Poll, ["explanationEntities", "descriptionEntities"]);
