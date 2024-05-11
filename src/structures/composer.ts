import { Inspectable } from "inspectable";
import { Composer as MiddlewareComposer } from "middleware-io";

import type { Context } from "../contexts/context";

@Inspectable()
// @ts-expect-error Composer does not like MiddlewareComposer...
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Composer<T extends Context<any>> extends MiddlewareComposer<T> {
	/**
	 * Create new `Composer` instance
	 */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	static builder<T extends Context<any>>(): Composer<T> {
		return new Composer<T>();
	}
}
