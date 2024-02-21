import { inspectable } from "inspectable";

import { TelegramObjects } from "@gramio/types";

import { SERVICE_MESSAGE_EVENTS } from "#utils";

import { BotLike } from "#types";
import type {
	ContextsMapping,
	MaybeArray,
	SoftString,
	UpdateName,
} from "#utils";

interface ContextOptions<Bot extends BotLike> {
	bot: Bot;
	update?: TelegramObjects.TelegramUpdate;
	updateType: UpdateName;
	updateId?: number;
}

class Context<Bot extends BotLike> {
	bot: Bot;
	updateId?: number;
	update?: TelegramObjects.TelegramUpdate;

	protected updateType: UpdateName;

	constructor(options: ContextOptions<Bot>) {
		this.bot = options.bot;
		this.updateType = options.updateType;
		this.updateId = options.updateId;
		this.update = options.update;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	is<T extends UpdateName>(rawTypes: MaybeArray<SoftString<T>>) {
		const types = Array.isArray(rawTypes) ? rawTypes : [rawTypes];

		// TODO: it is interfering, make 'subTypes' logic maybe?
		if (types.includes("service_message")) {
			types.push(...SERVICE_MESSAGE_EVENTS);
		}

		return types.includes(this.updateType);
	}
}

interface Context<Bot extends BotLike> {
	is<T extends UpdateName>(
		rawTypes: MaybeArray<SoftString<T>>,
	): this is ContextsMapping[T];
}

inspectable(Context, {
	serialize(context) {
		return {};
	},
});

export { Context };
