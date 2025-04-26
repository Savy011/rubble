import monday from "./monday.txt?raw";
import { nanoid } from "nanoid";
import moment from "moment"
import { type MemberList } from "$lib/constants";

type MessageType = "text" | "photo" | "video" | "audio" | "live" | "sticker";

export function getChatMessages(member: MemberList, page: number) {
	switch (member) {
		case "soojin":
		case "monday":
			return getMessages(monday, page)
		case "soeun":
		case "jiyoon":
		case "jaehee":
		case "jihan":
		case "zoa":
	}
}

function getMessages(file: string, page: number) {
	const PAGE_SIZE = 50;

	const startIdx = (page - 1) * PAGE_SIZE;
	const endIdx = startIdx + PAGE_SIZE;

	const allMessages = getAllMessages(file)
	const messages = allMessages.splice(startIdx, endIdx)

	return messages
}

function getAllMessages(file: string) {
	const lines = file.split("\n")

	let lives = 0;
	let photos = 0;
	let videos = 0;
	let stickers = 0;

	const messages = lines.map((line) => {
		if (isValidLine(line)) {
			const messageId = nanoid();
			const time = moment(line.split(',')[0], "YYYY-MM-DD hh:mm:ssA").toDate();
			const text = line.split(": ")[1];
			let type: MessageType;

			if (text?.includes("(Photo)")) {
				type = "photo";
				photos += 1;
			} else if (text?.includes("(Video)")) {
				type = "video";
				videos += 1;
			}
			else if (text?.includes("/Sticker/")) {
				type = "sticker";
				stickers += 1;
			}
			else if (text?.includes("bubble LIVE")) {
				type = "live";
				lives += 1;
			} else {
				type = "text";
			}

			return {
				id: messageId,
				time,
				type,
				text
			}
		} else {
			return {
				id: nanoid(),
				time: moment().toDate(),
				type: "ignore",
				text: "placeholder text for broken messages"
			}
		}
	})

	console.log(`Stats:\nPhotos: ${photos}\nVideos: ${videos}\nStickers: ${stickers}\nLives: ${lives}\n`)

	return messages
}

function isValidLine(line: string) {
	return moment(line.split(',')[0], "YYYY-MM-DD hh:mm:ssA").isValid();
}
