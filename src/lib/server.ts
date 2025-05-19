import { getChatMessages } from "$lib/messages";
import { Elysia, t } from 'elysia';

export const api = new Elysia({ prefix: '/api' })
	.get('/', () => 'hello rubble user!')
	.get('/messages', (ctx) => {
		const { member, page } = ctx.query

		const messages = getChatMessages(member, page);

		return { member, page, messages }
	}, {
		query: t.Object({
			member: t.Union([
				t.Literal("soojin"),
				t.Literal("monday"),
				t.Literal("soeun"),
				t.Literal("jiyoon"),
				t.Literal("jaehee"),
				t.Literal("jihan"),
				t.Literal("zoa"),
			]),
			page: t.Integer(),
		})
	})

export type Api = typeof api 
