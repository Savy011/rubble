import type { MemberList } from "$lib/constants";
import { getFullChats } from "$lib/messages";

export function getProgress(member: MemberList) {
	const messages = getFullChats(member)

	if (messages.length === 0) {
		return { error: "Missing member chats..." }
	}

	let totalText = 0
	let totalAudios = 0
	let totalPhotos = 0
	let totalVideos = 0
	let totalStickers = 0
	let totalLives = 0

	let textWithTranslation = 0
	let audiosWithSrc = 0
	let photosWithSrc = 0
	let videosWithSrc = 0
	let stickersWithSrc = 0
	let livesWithSrc = 0

	for (const message of messages) {
		switch (message.type) {
			case "text":
				totalText += 1;
				if (message.translation && message.translation !== "") {
					textWithTranslation += 1
				}
				continue;

			case "photo":
				totalPhotos += 1;
				if (message.src !== "") {
					photosWithSrc += 1
				}
				continue;

			case "video":
				totalVideos += 1;
				if (message.src !== "") {
					videosWithSrc += 1
				}
				continue;

			case "audio":
				totalAudios += 1;
				if (message.src !== "") {
					audiosWithSrc += 1
				}
				continue;

			case "sticker":
				totalStickers += 1;
				if (message.src !== "") {
					stickersWithSrc += 1
				}
				continue;

			case "live":
				totalLives += 1;
				if (message.src !== "") {
					livesWithSrc += 1;
				}
				continue;
		}
	}

	return [
		{ category: "translations", total: totalText, completed: textWithTranslation },
		{ category: "audio", total: totalAudios, completed: audiosWithSrc },
		{ category: "photos", total: totalPhotos, completed: photosWithSrc },
		{ category: "videos", total: totalVideos, completed: videosWithSrc },
		{ category: "stickers", total: totalStickers, completed: stickersWithSrc },
		{ category: "lives", total: totalLives, completed: livesWithSrc },
	]
}
