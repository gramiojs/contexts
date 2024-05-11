import { setTimeout } from "node:timers/promises";
import type { TelegramParams } from "@gramio/types";

import type { Optional } from "#types";

import type { Context } from "../context";

import type { BotLike } from "#types";
import type { SendMixin } from "./send";

interface CreateActionControllerParams {
	/**
	 * Interval between `sendChatAction` calls, in milliseconds
	 * @default 5000
	 */
	interval?: number;

	/**
	 * Initial wait before the first cycle of `sendChatAction` calls, in milliseconds
	 * @default 0
	 */
	wait?: number;

	/**
	 * Timeout for `sendChatAction` calls, in milliseconds. `0` to disable
	 * @default 0
	 */
	timeout?: number;
}

interface ControllerOptions<Bot extends BotLike> {
	action: TelegramParams.SendChatActionParams["action"];
	params: Optional<TelegramParams.SendChatActionParams, "chat_id" | "action"> &
		CreateActionControllerParams;
	context: Context<Bot> & SendMixin<Bot>;
}
/** This object represent ChatAction mixin */
class ChatActionController<Bot extends BotLike> {
	private abortController = new AbortController();

	action: TelegramParams.SendChatActionParams["action"];
	interval: number;
	wait: number;
	timeout: number;

	private context: Context<Bot> & SendMixin<Bot>;

	constructor(options: ControllerOptions<Bot>) {
		const { interval = 5_000, wait = 0, timeout = 0 } = options.params;

		this.action = options.action;
		this.interval = interval;
		this.wait = wait;
		this.timeout = timeout;
		this.context = options.context;
	}

	started = false;

	/** Starts the `sendChatAction(action)` loop until `stop()` is called */
	start() {
		if (this.started) {
			return;
		}

		this.started = true;

		setImmediate(async () => {
			const start = Date.now();

			if (this.wait > 0) {
				await setTimeout(this.wait);
			}

			while (!this.abortController.signal.aborted) {
				try {
					await this.context.sendChatAction(this.action, {
						suppress: true,
					});

					await setTimeout(this.interval);

					// stop if we hit the timeout mark
					if (this.timeout !== 0 && Date.now() - start > this.timeout) {
						break;
					}
				} catch (err) {
					// stop if we hit an error
					break;
				}
			}
		});
	}

	/** Stops the loop */
	stop() {
		this.started = false;

		this.abortController.abort();
	}
}

class ChatActionMixin<Bot extends BotLike> {
	/** Creates a controller that when `start()`ed executes `sendChatAction(action)` every `interval` milliseconds until `stop()`ped */
	createActionController(
		action: TelegramParams.SendChatActionParams["action"],
		params: Optional<
			TelegramParams.SendChatActionParams,
			"chat_id" | "action"
		> &
			CreateActionControllerParams = {},
	) {
		return new ChatActionController({
			action,
			params,
			context: this,
		});
	}
}

interface ChatActionMixin<Bot extends BotLike>
	extends Context<Bot>,
		SendMixin<Bot> {}

export { ChatActionMixin };
