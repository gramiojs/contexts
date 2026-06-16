import { describe, expect, test } from "bun:test";
import { CallbackQueryContext } from "../src/index.ts";

// Records every bot.api.* call so we can assert what SendMixin forwarded.
function makeCallbackCtx(
	calls: { method: string; params: Record<string, unknown> }[],
	message: Record<string, unknown>,
) {
	const api = new Proxy(
		{},
		{
			get:
				(_t, method: string) =>
				(params: Record<string, unknown>) => {
					calls.push({ method, params });
					return Promise.resolve({
						message_id: 2,
						chat: { id: 123, type: "supergroup" },
						date: 0,
						text: "",
					});
				},
		},
	);
	return new CallbackQueryContext({
		// biome-ignore lint/suspicious/noExplicitAny: test harness fakes the bot
		bot: { api } as any,
		// biome-ignore lint/suspicious/noExplicitAny: partial callback_query payload
		payload: {
			id: "q1",
			from: { id: 7, is_bot: false, first_name: "U" },
			chat_instance: "ci",
			message,
			// biome-ignore lint/suspicious/noExplicitAny: partial payload
		} as any,
		// biome-ignore lint/suspicious/noExplicitAny: partial update
		update: { update_id: 1 } as any,
		updateId: 1,
	});
}

describe("CallbackQueryContext thread forwarding (PR #4 Gap 2, guard kept)", () => {
	test("exposes threadId + isTopicMessage from the originating message", () => {
		const ctx = makeCallbackCtx([], {
			message_id: 1,
			chat: { id: 123, type: "supergroup", is_forum: true },
			date: 0,
			message_thread_id: 555,
			is_topic_message: true,
		});
		expect(ctx.threadId).toBe(555);
		expect(ctx.isTopicMessage()).toBe(true);
	});

	test("send() inside a callback auto-forwards message_thread_id for a topic message", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const ctx = makeCallbackCtx(calls, {
			message_id: 1,
			chat: { id: 123, type: "supergroup", is_forum: true },
			date: 0,
			message_thread_id: 555,
			is_topic_message: true,
		});
		await ctx.send("hi");
		expect(calls[0].method).toBe("sendMessage");
		expect(calls[0].params.message_thread_id).toBe(555);
	});

	test("guard still skips when the origin message is not a topic/thread message", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const ctx = makeCallbackCtx(calls, {
			message_id: 1,
			chat: { id: 123, type: "supergroup" },
			date: 0,
			// no message_thread_id / is_topic_message
		});
		await ctx.send("hi");
		expect(calls[0].method).toBe("sendMessage");
		expect(calls[0].params.message_thread_id).toBeUndefined();
	});

	test("caller-provided message_thread_id always wins", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const ctx = makeCallbackCtx(calls, {
			message_id: 1,
			chat: { id: 123, type: "supergroup", is_forum: true },
			date: 0,
			message_thread_id: 555,
			is_topic_message: true,
		});
		await ctx.send("hi", { message_thread_id: 999 });
		expect(calls[0].params.message_thread_id).toBe(999);
	});
});
