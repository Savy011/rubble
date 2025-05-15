import META_MONDAY from "./chunks/monday/monday_metadata.json";
import META_JIYOON from "./chunks/jiyoon/jiyoon_metadata.json";

import type { Message } from "$lib/types";

const mondayChunkImports = import.meta.glob<true, string, Message[]>("./chunks/monday/monday_chunk_*.json", {
	eager: true,
	import: 'default'
})

const jiyoonChunkImports = import.meta.glob<true, string, Message[]>("./chunks/jiyoon/jiyoon_chunk_*.json", {
	eager: true,
	import: 'default'
})


function getAllChunks(messages: Record<string, Message[]>) {
	let allChunks = [];

	for (const path in messages) {
		allChunks.push(messages[path]);
	}

	const sortedChunks = allChunks.toSorted((a, b) => a[0].timestamp - b[0].timestamp)

	return sortedChunks;
}

export const MONDAY_CHUNKS = getAllChunks(mondayChunkImports);
export const JIYOON_CHUNKS = getAllChunks(jiyoonChunkImports);
