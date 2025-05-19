export type MemberShortcut = ("soojin" | "monday" | "soeun" | "jiyoon" | "jaehee" | "jihan" | "zoa")[]

type MessageBase = {
	id: string;
	timestamp: number;
	text: string;
}

type MessageWithText = {
	type: "text";
	translation: string;
} & MessageBase

type MessageWithPhoto = {
	type: "photo" | "sticker";
	src: string;
	width?: number;
	height?: number;
} & MessageBase

type MessageWithMedia = {
	type: "audio" | "video";
	src: string;
} & MessageBase

type MessageWithLive = {
	type: "live";
	duration: number;
	src: string;
} & MessageBase

export type Message = Prettify<MessageWithText | MessageWithPhoto | MessageWithMedia | MessageWithLive>

export type MessageType = "text" | "sticker" | "audio" | "video" | "photo" | "live"

export type MessageMediaType = "audio" | "video" | "photo"

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
