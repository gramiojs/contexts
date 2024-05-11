import type { TelegramUpdate } from "@gramio/types";
import type { Constructor } from "../../types";

import type { BotLike } from "../../types";
import type { Context } from "../context";

interface CloneMixinMetadata<P> {
	/** The raw data that is used for this Context */
	payload: P;
}

/** This object represents a mixin which has `clone(options?)` method */
class CloneMixin<
	Bot extends BotLike,
	C extends Context<Bot> & Constructor<C>,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	Options extends Record<string, any>,
> {
	clone(options?: Options) {
		return new (this.constructor as C)({
			bot: this.bot,
			payload: this.payload,
			updateId: this.updateId as number,
			update: this.update as TelegramUpdate,
			type: this.updateType,
			...options,
		});
	}
}

interface CloneMixin<Bot extends BotLike, C, Options>
	extends Context<Bot>,
		CloneMixinMetadata<Options["payload"]> {}

export { CloneMixin };
