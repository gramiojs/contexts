import { describe, expect, test } from "bun:test";
import { MessageContext } from "../src/index.ts";

// A minimal stand-in for a `@gramio/format` RichString — only the brand + toInputRichMessage,
// which is exactly what `isRichString` detects (no @gramio/format dependency needed in tests).
const RICH_BRAND = Symbol.for("@gramio/format/rich.RichString");
const fakeRich = (markdown: string) => ({
	[RICH_BRAND]: true,
	toInputRichMessage: () => ({ markdown }),
});

function makeCtx(calls: { method: string; params: Record<string, unknown> }[]) {
	const api = new Proxy(
		{},
		{
			get:
				(_t, method: string) =>
				(params: Record<string, unknown>) => {
					calls.push({ method, params });
					return Promise.resolve(
						method === "editMessageText"
							? true
							: { message_id: 2, chat: { id: 123, type: "private" }, date: 0, text: "" },
					);
				},
		},
	);
	// biome-ignore lint/suspicious/noExplicitAny: test harness fakes the bot
	return new MessageContext({
		bot: { api } as any,
		payload: { message_id: 1, chat: { id: 123, type: "private" }, date: 0 } as any,
	});
}

describe("rich routing in context methods", () => {
	test("send(RichString) → sendRichMessage with rich_message", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		await makeCtx(calls).send(fakeRich("# hi") as unknown as string);
		expect(calls[0].method).toBe("sendRichMessage");
		expect(calls[0].params.rich_message).toEqual({ markdown: "# hi" });
		expect(calls[0].params.chat_id).toBe(123);
		expect(calls[0].params.text).toBeUndefined();
	});

	test("send(string) → sendMessage (unchanged)", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		await makeCtx(calls).send("plain");
		expect(calls[0].method).toBe("sendMessage");
		expect(calls[0].params.text).toBe("plain");
	});

	test("reply(RichString) inherits the branch → sendRichMessage", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		await makeCtx(calls).reply(fakeRich("body") as unknown as string);
		expect(calls[0].method).toBe("sendRichMessage");
		expect((calls[0].params.reply_parameters as { message_id: number }).message_id).toBe(1);
	});

	test("editText(RichString) → editMessageText with rich_message, no text", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		await makeCtx(calls).editText(fakeRich("**x**") as unknown as string);
		expect(calls[0].method).toBe("editMessageText");
		expect(calls[0].params.rich_message).toEqual({ markdown: "**x**" });
		expect(calls[0].params.text).toBeUndefined();
	});
});

// Build a MessageContext over a payload carrying an incoming rich_message tree.
function makeRichCtx(blocks: unknown[]) {
	return new MessageContext({
		// biome-ignore lint/suspicious/noExplicitAny: test harness fakes the bot
		bot: { api: {} } as any,
		payload: {
			message_id: 1,
			chat: { id: 123, type: "private" },
			date: 0,
			rich_message: { blocks },
			// biome-ignore lint/suspicious/noExplicitAny: partial payload for the test
		} as any,
	});
}

describe("receiving rich messages → ctx.richMessage + .text flattener", () => {
	test("ctx.richMessage exposes blocks + isRtl", () => {
		const ctx = makeRichCtx([{ type: "paragraph", text: "hi" }]);
		expect(ctx.richMessage?.blocks).toHaveLength(1);
		expect(ctx.richMessage?.isRtl).toBeUndefined();
	});

	test(".text flattens the block tree (heading + list + nested inline)", () => {
		const ctx = makeRichCtx([
			{ type: "heading", level: 1, text: "Title" },
			{
				type: "paragraph",
				text: ["Hello ", { type: "bold", text: "world" }, "!"],
			},
			{
				type: "list",
				items: [
					{ label: "1", blocks: [{ type: "paragraph", text: "one" }] },
					{ label: "2", blocks: [{ type: "paragraph", text: "two" }] },
				],
			},
		]);
		expect(ctx.richMessage?.text).toBe("Title\n\nHello world!\n\none\ntwo");
	});

	test("ctx.text falls back to the flattened rich text when there's no plain text", () => {
		const ctx = makeRichCtx([{ type: "paragraph", text: "/start ref" }]);
		expect(ctx.text).toBe("/start ref");
		// command/start parsing keeps working over rich messages
		expect(ctx.rawStartPayload).toBe("ref");
	});

	test("ctx.text stays undefined for a rich message with no textual content", () => {
		const ctx = makeRichCtx([{ type: "divider" }]);
		expect(ctx.text).toBeUndefined();
	});

	test(".text includes 10.3 buttons, expandable quotes, documents, captions and credits", () => {
		const ctx = makeRichCtx([
			{
				type: "paragraph",
				text: [
					"Choose ",
					{
						type: "button",
						button: { text: "inline", callback_data: "inline" },
					},
				],
			},
			{
				type: "buttons",
				buttons: [
					{ text: "Approve", callback_data: "yes" },
					{ text: "Reject", callback_data: "no" },
				],
			},
			{
				type: "expandable_blockquote",
				text: "Hidden details",
				credit: "Source",
			},
			{
				type: "document",
				document: { file_id: "file" },
				caption: { text: "Report", credit: "Analyst" },
			},
			{
				type: "table",
				cells: [
					[
						{ text: "A", align: "left", valign: "top" },
						{ text: "B", align: "left", valign: "top" },
					],
				],
				caption: "Totals",
			},
		]);

		expect(ctx.richMessage?.text).toBe(
			"Choose inline\n\nApprove Reject\n\nHidden details\nSource\n\nReport\nAnalyst\n\nA\tB\nTotals",
		);
	});
});

describe("streamRichMessage — draft lifecycle", () => {
	test("handle: append + finalize → sendRichMessage with the full markdown", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const draft = makeCtx(calls).streamRichMessage({ throttle: 0 });
		draft.append("Hello ").append(fakeRich("**world**"));
		const message = await draft.finalize();

		const final = calls.find((c) => c.method === "sendRichMessage");
		expect(final?.params.rich_message).toEqual({ markdown: "Hello **world**" });
		expect(final?.params.chat_id).toBe(123);
		expect(message.id).toBe(2);
		expect(draft.finalized).toBe(true);
	});

	test("finalize is idempotent (one sendRichMessage)", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const draft = makeCtx(calls).streamRichMessage();
		draft.append("x");
		const a = await draft.finalize();
		const b = await draft.finalize();
		expect(a).toBe(b);
		expect(calls.filter((c) => c.method === "sendRichMessage")).toHaveLength(1);
	});

	test("append throttles previews but uses a single non-zero draft_id", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const draft = makeCtx(calls).streamRichMessage({ throttle: 0 });
		draft.append("a");
		// let the throttled preview flush
		await new Promise((r) => setTimeout(r, 5));
		const preview = calls.find((c) => c.method === "sendRichMessageDraft");
		expect(preview).toBeDefined();
		expect(preview?.params.draft_id).toBe(draft.draftId);
		expect(draft.draftId).not.toBe(0);
		await draft.finalize();
	});

	test("await using auto-finalizes on scope exit", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const ctx = makeCtx(calls);
		{
			await using draft = ctx.streamRichMessage({ throttle: 0 });
			draft.append(fakeRich("# done"));
		}
		const final = calls.find((c) => c.method === "sendRichMessage");
		expect(final?.params.rich_message).toEqual({ markdown: "# done" });
	});

	test("iterable form drains, finalizes, returns the sent message", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		async function* gen() {
			yield "one ";
			yield fakeRich("two");
		}
		const message = await makeCtx(calls).streamRichMessage(gen(), {
			throttle: 0,
		});
		const final = calls.find((c) => c.method === "sendRichMessage");
		expect(final?.params.rich_message).toEqual({ markdown: "one two" });
		expect(message.id).toBe(2);
	});

	test("aborted stream throws and never finalizes", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const controller = new AbortController();
		controller.abort();
		await expect(
			makeCtx(calls).streamRichMessage(["x"], { signal: controller.signal }),
		).rejects.toThrow();
		expect(calls.find((c) => c.method === "sendRichMessage")).toBeUndefined();
	});
});

describe("streamMessage — await using handle (plain text)", () => {
	test("append + finalize → one sendMessage with the accumulated text + rebased entities", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const draft = makeCtx(calls).streamMessage({ throttle: 0 });
		draft.append("Hello ");
		draft.append({ text: "world", entities: [{ type: "bold", offset: 0, length: 5 }] });
		const messages = await draft.finalize();

		const sent = calls.filter((c) => c.method === "sendMessage");
		expect(sent).toHaveLength(1);
		expect(sent[0].params.text).toBe("Hello world");
		// entity offset rebased from piece-relative (0) to segment-relative (6)
		expect(sent[0].params.entities).toEqual([
			{ type: "bold", offset: 6, length: 5 },
		]);
		expect(messages).toHaveLength(1);
		expect(messages[0].id).toBe(2);
	});

	test("await using auto-finalizes on scope exit", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const ctx = makeCtx(calls);
		{
			await using draft = ctx.streamMessage({ throttle: 0 });
			draft.append("done");
		}
		const sent = calls.find((c) => c.method === "sendMessage");
		expect(sent?.params.text).toBe("done");
	});

	test("rolls over past 4096 chars into multiple messages", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const draft = makeCtx(calls).streamMessage({ throttle: 0 });
		draft.append("a".repeat(3000));
		draft.append("b".repeat(3000)); // would exceed 4096 → first segment sent, new one started
		const messages = await draft.finalize();

		const sent = calls.filter((c) => c.method === "sendMessage");
		expect(sent).toHaveLength(2);
		expect((sent[0].params.text as string).length).toBe(3000);
		expect((sent[1].params.text as string).length).toBe(3000);
		expect(messages).toHaveLength(2);
	});

	test("iterable form is unchanged → array of sent messages", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const messages = await makeCtx(calls).streamMessage(["x", "y"]);
		expect(messages).toHaveLength(1);
		expect(calls.some((c) => c.method === "sendMessage")).toBe(true);
	});
});
