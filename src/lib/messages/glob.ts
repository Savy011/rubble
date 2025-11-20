import META_SOOJIN from "./chunks/soojin/soojin_metadata.json";
import META_MONDAY from "./chunks/monday/monday_metadata.json";
import META_SOEUN from "./chunks/soeun/soeun_metadata.json";
import META_JIYOON from "./chunks/jiyoon/jiyoon_metadata.json";
import META_JAEHEE from "./chunks/jaehee/jaehee_metadata.json";
import META_ZOA from "./chunks/zoa/zoa_metadata.json";

import type { Message } from "$lib/types";

const soojinChunkImports = import.meta.glob<true, string, Message[]>("./chunks/soojin/soojin_chunk_*.json", {
	eager: true,
	import: 'default'
})

const mondayChunkImports = import.meta.glob<true, string, Message[]>("./chunks/monday/monday_chunk_*.json", {
	eager: true,
	import: 'default'
})

const soeunChunkImports = import.meta.glob<true, string, Message[]>("./chunks/soeun/soeun_chunk_*.json", {
	eager: true,
	import: 'default'
})

const jiyoonChunkImports = import.meta.glob<true, string, Message[]>("./chunks/jiyoon/jiyoon_chunk_*.json", {
	eager: true,
	import: 'default'
})

const jihyoChunkImports = import.meta.glob<true, string, Message[]>("./chunks/jihyo/jihyo_chunk_*.json", {
	eager: true,
	import: 'default'
})

const jaeheeChunkImports = import.meta.glob<true, string, Message[]>("./chunks/jaehee/jaehee_chunk_*.json", {
	eager: true,
	import: 'default'
})

const zoaChunkImports = import.meta.glob<true, string, Message[]>("./chunks/zoa/zoa_chunk_*.json", {
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

export { META_SOOJIN, META_MONDAY, META_SOEUN, META_JIYOON, META_JAEHEE, META_ZOA };

export const SOOJIN_CHUNKS = getAllChunks(soojinChunkImports);
export const MONDAY_CHUNKS = getAllChunks(mondayChunkImports);
export const SOEUN_CHUNKS = getAllChunks(soeunChunkImports);
export const JIYOON_CHUNKS = getAllChunks(jiyoonChunkImports);
export const JAEHEE_CHUNKS = getAllChunks(jaeheeChunkImports);
export const JIHYO_CHUNKS = getAllChunks(jihyoChunkImports);
export const ZOA_CHUNKS = getAllChunks(zoaChunkImports);
