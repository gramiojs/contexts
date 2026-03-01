---
name: sync-gramio-types
description: Syncs @gramio/contexts with a new @gramio/types version. Takes a GitHub patch URL (e.g. https://github.com/gramiojs/types/compare/vOLD...vNEW.patch) and applies all necessary changes to contexts, structures, and mixins. Use when the user provides a types diff/patch URL or asks to sync with a new Bot API version.
---

# Sync @gramio/contexts with @gramio/types

This skill analyzes a `@gramio/types` GitHub patch URL and implements all necessary changes in `@gramio/contexts`.

## How It Works

The user provides a patch URL in the format:
```
https://github.com/gramiojs/types/compare/vOLD...vNEW.patch
```

### Step 1 — Fetch and analyze the patch

Fetch the patch with `curl -sL <url>`. Then analyze changes in `out/objects.d.ts` and `out/params.d.ts` and `out/methods.d.ts` by looking at hunk-level diffs. Ignore pure doc changes (URL `/#anchor` → `#anchor` reformatting). Focus on:

- **New interfaces** starting with `Telegram` (new Telegram object types)
- **New fields on `TelegramMessage`** — each is either a sub-event (object type = new context needed) or a data field (getter on `Message` structure)
- **New fields on existing objects** (`TelegramChat`, `TelegramChatMember*`, `TelegramChatAdministratorRights`, `TelegramChatPermissions`, `TelegramMessageEntity`, etc.)
- **New union members** on `type TelegramXxx =` (e.g. new message entity type)
- **New top-level update fields** on `TelegramUpdate` (new context class needed)
- **New API methods** on `APIMethods` (may need mixin methods)
- **New params interfaces** (new `SetXxxParams` → new mixin method)

### Step 2 — Categorize changes

For each change, determine what it maps to in contexts:

| Type of change | What to update |
|---|---|
| New field on `TelegramMessage` (primitive/bool/string) | Add getter to `src/structures/message.ts` |
| New field on `TelegramMessage` (object type, new event) | Full context + structure + registration (see CLAUDE.md) |
| New field on `TelegramMessageEntity` | Add getter to `src/structures/message-entity.ts` |
| New field on `TelegramChatAdministratorRights` | Add method to `src/structures/chat-administrator-rights.ts` |
| New field on `TelegramChatMember*` | Add method to `src/structures/chat-member.ts` |
| New field on `TelegramChatPermissions` | Add getter to `src/structures/chat-permissions.ts` |
| New field on `TelegramChat` | Add getter to `src/structures/chat.ts` |
| New field on `TelegramChatFullInfo` | Add getter to `src/structures/chat-full-info.ts` |
| New standalone `TelegramXxx` object | Create `src/structures/{kebab-name}.ts`, export from `src/structures/index.ts` |
| New API method for member management | Add method to `src/contexts/mixins/chat-member-control.ts` |
| New API method for chat management | Add method to `src/contexts/mixins/chat-control.ts` |
| New API method for sending | Add method to `src/contexts/mixins/send.ts` |

### Step 3 — Update `devDependencies`

In `package.json`, update `@gramio/types` in `devDependencies` to the new version (the `peerDependencies` version should match too). Run `bun install`.

### Step 4 — Implement changes

For **new getters** on structures, follow the existing pattern:
- Simple fields: `@Inspect({ nullable: false }) get camelCase() { return this.payload.snake_case; }`
- Booleans via `@Inspect({ compute: true })` method pattern for ChatMember/ChatAdministratorRights
- Object fields: wrap with the structure class, add to `memoizeGetters()` call

For **new mixin methods**, follow the existing pattern in the mixin class:
- Use `Optional<TelegramParams.XxxParams, "chat_id" | "user_id">` to omit auto-filled params
- Use `this.chatId`, `this.senderId!` for auto-filling

For **new structures**, use `@Inspectable()` class with `@Inspect()` getters, following `src/structures/suggested-post-price.ts` as template.

For **new contexts** (message sub-events or top-level updates), follow the full registration checklist in CLAUDE.md.

### Step 5 — Update README

Update the Bot API version badge in `README.md`:
```
Currently, support [Telegram Bot API X.Y+](https://core.telegram.org/bots/api-changelog#month-day-year).
```
Find the changelog anchor at `https://core.telegram.org/bots/api-changelog`.

### Step 6 — Verify

```bash
bun install                    # Install updated types
bunx tsc --noEmit              # Type-check (only pre-existing errors are OK)
bunx @biomejs/biome check --fix --unsafe ./src  # Auto-fix formatting
```

## Key File Locations

- Structures: `src/structures/{kebab-name}.ts`
- Structure index: `src/structures/index.ts`
- Message structure: `src/structures/message.ts`
- Message entity: `src/structures/message-entity.ts`
- Chat member: `src/structures/chat-member.ts`
- Chat admin rights: `src/structures/chat-administrator-rights.ts`
- Chat permissions: `src/structures/chat-permissions.ts`
- Contexts: `src/contexts/{kebab-name}.ts`
- Context index: `src/contexts/index.ts`
- Context mappings: `src/index.ts` and `src/types.ts`
- Events array + service messages: `src/utils.ts`
- Member control mixin: `src/contexts/mixins/chat-member-control.ts`
- Chat control mixin: `src/contexts/mixins/chat-control.ts`
- Send mixin: `src/contexts/mixins/send.ts`
