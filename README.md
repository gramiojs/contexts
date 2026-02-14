# @gramio/contexts

[![npm](https://img.shields.io/npm/v/@gramio/contexts?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/@gramio/contexts)
[![npm downloads](https://img.shields.io/npm/dw/@gramio/contexts?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/@gramio/contexts)
[![JSR](https://jsr.io/badges/@gramio/contexts)](https://jsr.io/@gramio/contexts)
[![JSR Score](https://jsr.io/badges/@gramio/contexts/score)](https://jsr.io/@gramio/contexts)

Contexts is a great work of the [puregram](https://github.com/nitreojs/puregram) maintainer! Thank you for many code implementation and ideas. Forked since this [commit](https://github.com/nitreojs/puregram/commit/b431d9303de1696999e7f41f45d7c4d7d264c272). (Jan 28, 2024)

Currently, support [Telegram Bot API 9.4+](https://core.telegram.org/bots/api-changelog#february-9-2026).

This library used under the hood in the GramIO framework (Please see [documentation](https://gramio.dev/)).

## TypeScript

```typescript
import { ContextType } from "@gramio/contexts";

type Message = ContextType<Bot, "message">;
```
