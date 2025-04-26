import { MEMBER_LIST, type MemberList } from '$lib/constants';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param): param is MemberList => {
	return MEMBER_LIST.includes(param)
}) satisfies ParamMatcher
