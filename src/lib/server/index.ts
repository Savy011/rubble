import { MEMBER_LIST_TYPE } from "$lib/constants";
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
			member: t.Union(MEMBER_LIST_TYPE.map(m => t.Literal(m))),
			page: t.Integer(),
		})
	})

export type Api = typeof api 
