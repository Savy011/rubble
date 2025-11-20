import { type MemberList } from "$lib/constants";

import {
	SOOJIN_CHUNKS,
	MONDAY_CHUNKS,
	SOEUN_CHUNKS,
	JIYOON_CHUNKS,
	JAEHEE_CHUNKS,
	JIHYO_CHUNKS,
	ZOA_CHUNKS,
	META_SOOJIN,
	META_ZOA,
	META_JAEHEE,
	META_JIYOON,
	META_SOEUN,
	META_MONDAY
} from "./glob";
import type { Message } from "$lib/types";

export function getChatMessages(member: MemberList, page: number) {
	switch (member) {
		case "soojin":
			return getMessages(SOOJIN_CHUNKS, page);
		case "monday":
			return getMessages(MONDAY_CHUNKS, page);
		case "soeun":
			return getMessages(SOEUN_CHUNKS, page);
		case "jiyoon":
			return getMessages(JIYOON_CHUNKS, page);
		case "jaehee":
			return getMessages(JAEHEE_CHUNKS, page);
		case "jihan":
			return getMessages(JIHYO_CHUNKS, page);
		case "zoa":
			return getMessages(ZOA_CHUNKS, page);
	}
}

export function getMetadata(member: MemberList) {
	switch (member) {
		case "soojin":
			return META_SOOJIN;
		case "monday":
			return META_MONDAY;
		case "soeun":
			return META_SOEUN;
		case "jiyoon":
			return META_JIYOON;
		case "jaehee":
			return META_JAEHEE;
		case "jihan":
			return [];
		case "zoa":
			return META_ZOA;
	}
}

export function getFullChats(member: MemberList) {
	switch (member) {
		case "soojin":
			return getAllMessages(SOOJIN_CHUNKS);
		case "monday":
			return getAllMessages(MONDAY_CHUNKS);
		case "soeun":
			return getAllMessages(SOEUN_CHUNKS);
		case "jiyoon":
			return getAllMessages(JIYOON_CHUNKS);
		case "jaehee":
			return getAllMessages(JAEHEE_CHUNKS);
		case "jihan":
			return getAllMessages(JIHYO_CHUNKS);
		case "zoa":
			return getAllMessages(ZOA_CHUNKS);
	}
}

function getMessages(chunks: Array<Message[]>, page: number) {
	return chunks[page - 1]
}

function getAllMessages(chunks: Array<Message[]>) {
	return chunks.flat();
}
