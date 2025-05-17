export type MemberShortcut = ("soojin" | "monday" | "soeun" | "jiyoon" | "jaehee" | "jihan" | "zoa")[]

type MessageBase = {
	id: string;
	timestamp: number;
	text: string;
}

type MessageWithText = {
	type: "text";
} & MessageBase

type MessageWithMedia = {
	type: "audio" | "video" | "photo" | "sticker";
	src: string;
} & MessageBase

type MessageWithLive = {
	type: "live";
	duration: number;
	src: string;
} & MessageBase

type MessageWithLink = {
	type: "link";
} & MessageBase

export type Message = Prettify<MessageWithText | MessageWithMedia | MessageWithLive | MessageWithLink>

export type MessageType = "text" | "sticker" | "audio" | "video" | "photo" | "live" | "link"

export type MessageMediaType = "audio" | "video" | "photo"

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
