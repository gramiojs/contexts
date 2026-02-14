# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@gramio/contexts` is the context layer for the [GramIO](https://gramio.dev/) Telegram Bot framework. It wraps raw Telegram Bot API updates into typed, ergonomic context objects with mixin-based composition. All Telegram types come from the `@gramio/types` peer dependency.

## Commands

```bash
bun type          # TypeScript type-check (tsc --noEmit)
bun lint          # Biome format/lint check
bun lint:fix      # Auto-fix lint issues
bun generate      # Generate structure classes from Bot API schema
bun circular      # Detect circular dependencies (madge)
bunx pkgroll      # Build (CJS + ESM + .d.ts)
bun test          # Run tests
```

## Architecture

### Three Layers

1. **Contexts** (`src/contexts/`) — Event handler classes. Each Telegram update type gets its own context class extending `Context<Bot>`. Message sub-events (gift, location, pinned_message, etc.) are extracted from the message payload and get their own context classes too.

2. **Structures** (`src/structures/`) — Data wrappers around raw Telegram objects. Most are auto-generated via `bun generate` from the schema in `scripts/custom.min.json`. They use `@Inspectable()` / `@Inspect()` decorators from the `inspectable` library.

3. **Mixins** (`src/contexts/mixins/`) — Reusable functionality composed into contexts at runtime via `applyMixins()`. Key mixins: `SendMixin` (send methods), `TargetMixin` (sender/chat metadata), `NodeMixin` (reply methods), `ChatControlMixin`, `PinsMixin`, `CloneMixin`, `ForumMixin`, etc.

### Key Utilities (`src/utils.ts`)

- `applyMixins(derivedCtor, baseCtors)` — Runtime prototype property copying for multiple inheritance.
- `memoizeGetters(cls, fields)` — Lazy-evaluates getters once, then caches as instance properties.
- `filterPayload(payload)` — Strips null/undefined/empty arrays for inspectable serialization.
- `EVENTS` array — Maps camelCase message payload properties to snake_case event names (used by the framework to route message sub-events).
- `SERVICE_MESSAGE_EVENTS` — Subset of message events considered service messages.

### Type System (`src/types.ts`)

- `BotLike` — The generic bot interface all contexts are parameterized over. Requires `api`, `__Derives`, and `downloadFile()`.
- `ContextsMapping<Bot>` — Maps every event name string to its context class type.
- `UpdateName` — Union of all event names (top-level updates + message sub-events + custom events like `service_message`).
- `MessageEventName` — Union of event names that are sub-events extracted from message payloads.
- `GetDerives<Bot, Event>` — Allows the framework to inject custom properties into contexts.

### Event Routing (`src/index.ts`)

The `contextsMappings` object maps event name strings to context classes. The framework uses this to instantiate the correct context for each incoming update. Several event names share the same context class (e.g., `message`, `channel_post`, `edited_message`, `edited_channel_post`, `business_message` all use `MessageContext`).

## How to Add a New Context (Message Sub-Event)

When a new Telegram Bot API version adds a new field to the Message object that represents a sub-event (like `gift`, `location`, `giveaway_created`):

1. **Create context file** `src/contexts/{kebab-case-name}.ts`:
   - Define `{Name}ContextOptions<Bot extends BotLike>` interface with `bot`, `update`, `payload` (TelegramMessage), `updateId`
   - Create class extending `Context<Bot>`, set `updateType` to the snake_case event name
   - Store `this.payload` (the full message) and extract the event-specific data from it
   - Add typed getters for event-specific fields, wrapping nested objects with structure classes
   - Declare the interface merging block extending `Constructor<...>`, `Message`, and desired mixins
   - Call `applyMixins()`, `memoizeGetters()` (for getters returning new objects), and `inspectable()`

2. **Export** from `src/contexts/index.ts`: add `export * from "./{kebab-case-name}.ts"`

3. **Register mapping** in `src/index.ts`: add `{snake_case_name}: Contexts.{Name}Context` to `contextsMappings`

4. **Register type mapping** in `src/types.ts`: add `{snake_case_name}: Contexts.{Name}Context<Bot>` to `ContextsMapping<Bot>`

5. **Add to `MessageEventName`** union in `src/types.ts`

6. **Add to `EVENTS`** array in `src/utils.ts`: `["{camelCaseName}", "{snake_case_name}"]`

7. **Add to `SERVICE_MESSAGE_EVENTS`** in `src/utils.ts` if it's a service message

Use `src/contexts/gift.ts` or `src/contexts/location.ts` as templates.

## How to Add a New Top-Level Update Context

For new top-level updates (like `callback_query`, `poll`, `chat_boost` — things that are direct fields on the Update object, not sub-events of Message):

1. **Create context file** — same pattern as above, but `payload` type is the specific Telegram object (e.g., `TelegramCallbackQuery`), not `TelegramMessage`
2. **Export, register mapping, register type mapping** — same steps 2-4 as above
3. Do NOT add to `MessageEventName`, `EVENTS`, or `SERVICE_MESSAGE_EVENTS` (those are only for message sub-events)

Use `src/contexts/callback-query.ts` or `src/contexts/poll.ts` as templates.

## How to Add a New Structure

Structures wrap raw Telegram API objects. Most are auto-generated:

1. Add the object name to the `objectToGenerate` array in `scripts/generate.ts`
2. Run `bun generate` — creates `src/structures/{kebab-case-name}.ts`
3. Export from `src/structures/index.ts`
4. For attachments, also add to `src/structures/attachments/` and `AttachmentsMapping` in `src/types.ts`

For manual structures or post-generation edits: follow the pattern of existing structures using `@Inspectable()` class decorator, `@Inspect()` getter decorators, and `memoizeGetters()` for nested object getters.

## How to Add New Methods to Contexts

To add a new API method available on contexts (e.g., a new `send*` method):

- If it applies to many contexts: add it to the appropriate mixin in `src/contexts/mixins/` (usually `send.ts` or `node.ts`)
- If it's specific to one context: add it directly to that context class
- Methods that need `chat_id` use `this.chatId || this.senderId || 0`
- Methods should use `Optional<TelegramParams.XxxParams, "chat_id" | ...>` to omit auto-filled params
- Auto-forward `businessConnectionId` and `threadId` when applicable (see existing methods in `send.ts`)

## Syncing with @gramio/types Updates

When `@gramio/types` is bumped (new Bot API version), follow this checklist to sync `@gramio/contexts`. The goal is to review the diff of the `@gramio/types` package and adapt this library accordingly.

### Step 1: Identify Changes

Review the `@gramio/types` diff (especially `out/objects.d.ts`, `out/methods.d.ts`, `out/params.d.ts`) to categorize changes:

- **New fields on `TelegramMessage`** — each new field is either:
  - A **message sub-event** (service message) if it's a new object type (e.g., `suggested_post_approved?: TelegramSuggestedPostApproved`) → needs a new context + structure
  - A **data field** (e.g., `is_paid_post?: boolean`, `direct_messages_topic?: TelegramDirectMessagesTopic`) → needs a getter added to the `Message` structure
  - An **info field** on existing messages (e.g., `suggested_post_info?: TelegramSuggestedPostInfo`) → needs a getter + structure
- **New standalone Telegram objects** → need new structure wrappers
- **New fields on existing objects** (e.g., `TelegramChat.is_direct_messages`) → need getters added to existing structures
- **New top-level update types** (new fields on `TelegramUpdate`) → need new top-level context classes
- **New API methods** (e.g., `approveSuggestedPost`) → may need mixin methods if relevant to contexts

### Step 2: Update `package.json`

Update `@gramio/types` version in `peerDependencies` if needed.

### Step 3: Create New Structures

For each new Telegram object type identified in Step 1:

1. Create `src/structures/{kebab-case-name}.ts` following the pattern:
   - `@Inspectable()` class with `constructor(public payload: TelegramObjects.TelegramXxx) {}`
   - `get [Symbol.toStringTag]()` returning `this.constructor.name`
   - `@Inspect()` getters for each field (use `{ nullable: false }` for optional fields)
   - `memoizeGetters()` for any getters that construct new objects
2. Export from `src/structures/index.ts` (alphabetical order)

Use existing structures as templates (e.g., `src/structures/suggested-post-price.ts` for simple objects, `src/structures/suggested-post-info.ts` for objects with nested structure references).

### Step 4: Update Existing Structures

For each new field added to existing Telegram objects:

1. Add the import for any new structure dependencies
2. Add `@Inspect()` getters following the existing pattern
3. Add to `memoizeGetters()` call if the getter creates new objects

Key structures to check:
- `src/structures/message.ts` — most common target for new fields; update both getters AND `memoizeGetters()` array
- `src/structures/chat.ts`, `src/structures/chat-full-info.ts` — for new chat properties
- Other structures referenced in the types diff

### Step 5: Create New Contexts

For each new **message sub-event** (service message field on `TelegramMessage`):

1. **Create context file** `src/contexts/{kebab-case-name}.ts` — see "How to Add a New Context" section above
2. **Export** from `src/contexts/index.ts`
3. **Register runtime mapping** in `src/index.ts` → `contextsMappings`
4. **Register type mapping** in `src/types.ts` → `ContextsMapping<Bot>`
5. **Add to `MessageEventName`** union in `src/types.ts`
6. **Add to `EVENTS`** array in `src/utils.ts`: `["{camelCaseName}", "{snake_case_name}"]`
7. **Add to `SERVICE_MESSAGE_EVENTS`** in `src/utils.ts` if it's a service message

For new **top-level update types**, follow "How to Add a New Top-Level Update Context" instead.

### Step 6: Update README.md

Update the Bot API version badge in `README.md`. The line looks like:

```
Currently, support [Telegram Bot API X.Y+](https://core.telegram.org/bots/api-changelog#...).
```

Change the version number and the anchor link to match the new Bot API version. The changelog anchors can be found at https://core.telegram.org/bots/api-changelog (format: `#month-day-year` e.g. `#december-31-2025`).

**IMPORTANT:** Never update the version to a higher Bot API version than what the user explicitly requested. Only set the version that was asked to sync with.

### Step 7: Verify

```bash
bun install                    # Install updated types
bunx tsc --noEmit              # Type-check (must pass with zero errors)
bunx @biomejs/biome check --fix --unsafe ./src  # Auto-fix formatting
```

### Quick Reference: All Registration Points

When adding a new message sub-event, you must update ALL of these files:

| File | What to add |
|------|-------------|
| `src/structures/{name}.ts` | New structure class (if needed) |
| `src/structures/index.ts` | `export * from "./{name}.ts"` |
| `src/structures/message.ts` | Getter + import + memoizeGetters entry |
| `src/contexts/{name}.ts` | New context class |
| `src/contexts/index.ts` | `export * from "./{name}.ts"` |
| `src/index.ts` | Entry in `contextsMappings` |
| `src/types.ts` | Entry in `ContextsMapping<Bot>` + `MessageEventName` union |
| `src/utils.ts` | Entry in `EVENTS` array + `SERVICE_MESSAGE_EVENTS` (if applicable) |
| `README.md` | Update Bot API version badge (always do this on any sync) |

## Context Pattern Summary

Every context follows this exact structure:

```typescript
// 1. Options interface
interface XxxContextOptions<Bot extends BotLike> { bot, update, payload, updateId }

// 2. Class
class XxxContext<Bot extends BotLike> extends Context<Bot> {
  payload: TelegramObjects.TelegramXxx;
  constructor(options) { super({...}); this.payload = options.payload; }
  // getters and methods
}

// 3. Interface merging for mixins (TypeScript side)
interface XxxContext<Bot> extends Constructor<XxxContext<Bot>>, Message, TargetMixin, SendMixin<Bot>, ... {}

// 4. Runtime mixin application
applyMixins(XxxContext, [Message, TargetMixin, SendMixin, ...]);

// 5. Memoize expensive getters
memoizeGetters(XxxContext, ["someGetter"]);

// 6. Inspectable for debug output
inspectable(XxxContext, { serialize(ctx) { return { ... }; } });
```
