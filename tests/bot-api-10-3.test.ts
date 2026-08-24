import { describe, expect, test } from "bun:test";
import { inspect } from "node:util";
import {
	ChatAdministratorRights,
	ChatMember,
	CommunityChatJoinedContext,
	InlineKeyboardButton,
	InlineKeyboardMarkup,
	MessageContext,
	MessageGenerationStoppedContext,
	UniqueGiftInfo,
	Update,
	contextsMappings,
} from "../src/index.ts";

function makeBot(calls: { method: string; params: Record<string, unknown> }[]) {
	return {
		api: new Proxy(
			{},
			{
				get:
					(_target, method: string) =>
					(params: Record<string, unknown>) => {
						calls.push({ method, params });
						return Promise.resolve({
							message_id: 2,
							chat: { id: 123, type: "private" },
							date: 0,
						});
					},
			},
		),
	};
}

describe("Bot API 10.3 update contexts", () => {
	test("stopped_message_generation exposes identifiers, chat and send capabilities", async () => {
		const calls: { method: string; params: Record<string, unknown> }[] = [];
		const update = {
			update_id: 10,
			stopped_message_generation: {
				chat: { id: 123, type: "private", first_name: "Ada" },
				message_thread_id: 9,
				draft_id: 77,
			},
		};
		const context = new MessageGenerationStoppedContext({
			// biome-ignore lint/suspicious/noExplicitAny: focused partial bot fixture
			bot: makeBot(calls) as any,
			// biome-ignore lint/suspicious/noExplicitAny: focused partial update fixture
			update: update as any,
			payload: update.stopped_message_generation,
			updateId: 10,
		});

		expect(context.draftId).toBe(77);
		expect(context.threadId).toBe(9);
		expect(context.chatId).toBe(123);
		expect(context.chatType).toBe("private");
		expect(context.chat.firstName).toBe("Ada");
		await context.send("Generation stopped");
		expect(calls[0]).toEqual({
			method: "sendMessage",
			params: {
				chat_id: 123,
				message_thread_id: 9,
				text: "Generation stopped",
			},
		});

		const cloned = context.clone();
		expect(cloned).toBeInstanceOf(MessageGenerationStoppedContext);
		expect(cloned.draftId).toBe(77);
		expect(inspect(context)).toContain("draftId: 77");
		expect(new Update(update as never).stoppedMessageGeneration?.draftId).toBe(77);
		expect(contextsMappings.stopped_message_generation).toBe(
			MessageGenerationStoppedContext,
		);
	});

	test("community_chat_joined is a routed service event with a wrapped community", () => {
		const update = { update_id: 11 };
		const payload = {
			message_id: 5,
			date: 0,
			chat: { id: -100, type: "supergroup", title: "Group" },
			community_chat_joined: {
				community: { id: 8, name: "Builders" },
			},
		};
		const message = new MessageContext({
			// biome-ignore lint/suspicious/noExplicitAny: focused partial bot fixture
			bot: makeBot([]) as any,
			// biome-ignore lint/suspicious/noExplicitAny: focused partial message fixture
			payload: payload as any,
		});
		const context = new CommunityChatJoinedContext({
			// biome-ignore lint/suspicious/noExplicitAny: focused partial bot fixture
			bot: makeBot([]) as any,
			// biome-ignore lint/suspicious/noExplicitAny: focused partial update fixture
			update: update as any,
			// biome-ignore lint/suspicious/noExplicitAny: focused partial message fixture
			payload: payload as any,
			updateId: 11,
		});

		expect(message.communityChatJoined?.community.name).toBe("Builders");
		expect(message.isServiceMessage()).toBe(true);
		expect(message.eventType).toBe("community_chat_joined");
		expect(context.community.name).toBe("Builders");
		expect(contextsMappings.community_chat_joined).toBe(
			CommunityChatJoinedContext,
		);
	});
});

describe("Bot API 10.3 structure getters", () => {
	test("administrator rights, disabled buttons and inline force reply", () => {
		const rights = {
			is_anonymous: false,
			can_manage_chat: true,
			can_delete_messages: true,
			can_manage_video_chats: true,
			can_restrict_members: true,
			can_promote_members: true,
			can_change_info: true,
			can_invite_users: true,
			can_send_welcome_messages: true,
		};
		expect(new ChatAdministratorRights(rights).canSendWelcomeMessages()).toBe(
			true,
		);
		expect(
			new ChatMember({
				...rights,
				status: "administrator",
				user: { id: 1, is_bot: false, first_name: "Ada" },
				can_be_edited: true,
			}).canSendWelcomeMessages(),
		).toBe(true);
		expect(new InlineKeyboardButton({ text: "Soon", disabled: {} }).isDisabled()).toBe(
			true,
		);
		expect(
			new InlineKeyboardMarkup({
				inline_keyboard: [[{ text: "Soon", disabled: {} }]],
				force_reply: true,
			}).forceReply,
		).toBe(true);
	});

	test("unique gift text exposes wrapped entities and privacy", () => {
		const info = new UniqueGiftInfo({
			// biome-ignore lint/suspicious/noExplicitAny: gift details are irrelevant to these getters
			gift: {} as any,
			origin: "transfer",
			text: "Private",
			entities: [{ type: "bold", offset: 0, length: 7 }],
			is_private: true,
		});
		expect(info.text).toBe("Private");
		expect(info.entities?.[0].type).toBe("bold");
		expect(info.isPrivate()).toBe(true);
	});
});
