import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/** Flatten a {@link TelegramObjects.TelegramRichText | RichText} node to its plain text. */
function flattenRichText(node: TelegramObjects.TelegramRichText | undefined): string {
	if (node == null) return "";
	if (typeof node === "string") return node;
	if (Array.isArray(node)) return node.map(flattenRichText).join("");
	if (node.type === "button") return flattenRichText(node.button.text);
	// Most node variants nest the visible text under `.text`; leaf nodes (e.g. `anchor`)
	// carry only a name and contribute no visible text.
	const withText = node as { text?: TelegramObjects.TelegramRichText };
	return "text" in withText ? flattenRichText(withText.text) : "";
}

function joinVisible(parts: string[], separator = "\n") {
	return parts.filter(Boolean).join(separator);
}

function flattenCaption(
	caption: TelegramObjects.TelegramRichBlockCaption | undefined,
) {
	if (!caption) return "";
	return joinVisible([
		flattenRichText(caption.text),
		flattenRichText(caption.credit),
	]);
}

/** Flatten one {@link TelegramObjects.TelegramRichBlock | RichBlock} to plain text. */
function flattenRichBlock(block: TelegramObjects.TelegramRichBlock): string {
	// biome-ignore lint/suspicious/noExplicitAny: block is a discriminated union; fields are read per-variant.
	const b = block as any;
	switch (block.type) {
		case "paragraph":
		case "heading":
		case "pre":
		case "footer":
		case "thinking":
			return flattenRichText(b.text);
		case "pullquote":
		case "expandable_blockquote":
			return joinVisible([
				flattenRichText(b.text),
				flattenRichText(b.credit),
			]);
		case "list":
			return (b.items as TelegramObjects.TelegramRichBlockListItem[])
				.map((item) => item.blocks.map(flattenRichBlock).join("\n"))
				.join("\n");
		case "blockquote":
			return joinVisible([
				(b.blocks as TelegramObjects.TelegramRichBlock[])
					.map(flattenRichBlock)
					.join("\n"),
				flattenRichText(b.credit),
			]);
		case "details":
			return [
				flattenRichText(b.summary),
				...(b.blocks as TelegramObjects.TelegramRichBlock[]).map(flattenRichBlock),
			]
				.filter(Boolean)
				.join("\n");
		case "table":
			return joinVisible([
				(b.cells as TelegramObjects.TelegramRichBlockTableCell[][])
					.map((row) =>
						row.map((cell) => flattenRichText(cell.text)).join("\t"),
					)
					.join("\n"),
				flattenRichText(b.caption),
			]);
		case "collage":
		case "slideshow":
			return joinVisible([
				(b.blocks as TelegramObjects.TelegramRichBlock[])
					.map(flattenRichBlock)
					.join("\n"),
				flattenCaption(b.caption),
			]);
		case "buttons":
			return (b.buttons as TelegramObjects.TelegramRichMessageButton[])
				.map((button) => flattenRichText(button.text))
				.filter(Boolean)
				.join(" ");
		case "map":
		case "animation":
		case "audio":
		case "document":
		case "photo":
		case "video":
		case "voice_note":
			return flattenCaption(b.caption);
		default:
			// divider / anchor / mathematical_expression carry no flattenable text
			return "";
	}
}

/**
 * Rich formatted message.
 *
 * The `blocks` are exposed as their raw {@link TelegramObjects.TelegramRichBlock}
 * payloads — the rich message tree is a deeply nested, recursive union, so it is
 * left untyped-wrapped and consumed directly via the fully typed payload.
 *
 * Use {@link RichMessage.text | .text} to get the flattened plain text, which lets
 * existing `ctx.text`-based handlers (commands, filters) keep working on rich messages.
 *
 * [Documentation](https://core.telegram.org/bots/api/#richmessage)
 */
@Inspectable()
export class RichMessage {
	constructor(public payload: TelegramObjects.TelegramRichMessage) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Content of the message */
	@Inspect()
	get blocks() {
		return this.payload.blocks;
	}

	/** `true`, if the rich message must be shown right-to-left */
	@Inspect({ nullable: false })
	get isRtl() {
		return this.payload.is_rtl;
	}

	/**
	 * The message flattened to plain text — blocks joined by blank lines, formatting stripped.
	 *
	 * Lets text-based handlers keep working on rich messages: `ctx.text` falls back to this
	 * when a message has no plain `text`. Returns `""` for a message with no textual content.
	 */
	@Inspect({ nullable: false })
	get text(): string {
		return this.payload.blocks.map(flattenRichBlock).filter(Boolean).join("\n\n");
	}

	toString() {
		return this.text;
	}
}
