import { type MemberList } from "$lib/constants";

import { MONDAY_CHUNKS, JIYOON_CHUNKS } from "./glob";
import type { Message } from "$lib/types";

export function getChatMessages(member: MemberList, page: number) {
	switch (member) {
		case "soojin":
			return [];
		case "monday":
			return getMessages(MONDAY_CHUNKS, page);
		case "soeun":
			return [];
		case "jiyoon":
			return getMessages(JIYOON_CHUNKS, page);
		case "jaehee":
			return [];
		case "jihan":
			return [];
		case "zoa":
			return [];
	}
}

function getMessages(chunk: Array<Message[]>, page: number) {
	return chunk[page - 1]
}

