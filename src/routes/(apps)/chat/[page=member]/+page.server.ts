import { APPS } from "$lib/constants";

import type { PageServerLoad } from "./$types";
import { getChatMessages } from "$lib/messages";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = ({ params, url }) => {
	const member = APPS.find(m => m.label.toLowerCase() === params.page)

	if (!member) error(404, "Invalid Member")

	let page = Number.parseInt(url.searchParams.get("page") ?? "1");

	const messages = getChatMessages(params.page, page);

	return {
		member,
		messages
	}
}
