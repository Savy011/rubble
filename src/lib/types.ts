export type Message = {
	id: number,
	content: string,
	translation: string,
	attachments: [],
	sticker: string,
	time: string
}

export type MemberShortcut = ("soojin" | "monday" | "soeun" | "jiyoon" | "jaehee" | "jihan" | "zoa")[]
