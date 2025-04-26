import { getChatMessages } from "$lib/messages/loader";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { MEMBER_LIST } from "$lib/constants";

export const GET: RequestHandler = ({ url }) => {
	const member = url.searchParams.get("member");
	const page = url.searchParams.get("page");

	if (!member) {
		return json({ message: "missing member name" }, { status: 403 });
	}


	if (!(MEMBER_LIST.includes(member))) {
		return json({ message: "invalid member name" }, { status: 403 });
	}

	const messages = getChatMessages("monday", Number.parseInt(page ?? "1"));

	return json({ messages });
}
