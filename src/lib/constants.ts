import pfpSoojin from "$lib/assets/member_icons/pfp_soojin.jpg"
import pfpMonday from "$lib/assets/member_icons/pfp_monday.jpg";
import pfpSoeun from "$lib/assets/member_icons/pfp_soeun.jpg";
import pfpJiyoon from "$lib/assets/member_icons/pfp_jiyoon.jpg"
import pfpJaehee from "$lib/assets/member_icons/pfp_jaehee.jpg";
import pfpJihan from "$lib/assets/member_icons/pfp_jihan.jpg";
import pfpZoa from "$lib/assets/member_icons/pfp_zoa.jpg";

export const MEMBER_LIST = [
	"soojin",
	"monday",
	"soeun",
	"jiyoon",
	"jaehee",
	"jihan",
	"zoa"
]

export const MEMBER_LIST_TYPE = [
	"soojin",
	"monday",
	"soeun",
	"jiyoon",
	"jaehee",
	"jihan",
	"zoa"
] as const

export type MemberList = typeof MEMBER_LIST_TYPE[number]

export const APPS = [
	{ href: '/chat/soojin', label: 'Soojin', icon: '🐶', pfp: pfpSoojin, fullName: "Lee Soojin", nickname: "🍓" },
	{ href: '/chat/monday', label: 'Monday', icon: '🐱', pfp: pfpMonday, fullName: "Kim Jimin", nickname: "찜🖤" },
	{ href: '/chat/soeun', label: 'Soeun', icon: '🐻', pfp: pfpSoeun, fullName: "Park Soeun", nickname: "소은이" },
	{ href: '/chat/jiyoon', label: 'Jiyoon', icon: '🐹', pfp: pfpJiyoon, fullName: "Shin Jiyoon", nickname: "유니" },
	{ href: '/chat/jaehee', label: 'Jaehee', icon: '🐥', pfp: pfpJaehee, fullName: "Lee Jaehee", nickname: "재히공쥬" },
	{ href: '/chat/jihan', label: 'Jihan', icon: '🐰', pfp: pfpJihan, fullName: "Han Jihyo", nickname: "지효 ❤️🎀" },
	{ href: '/chat/zoa', label: 'Zoa', icon: '🦌', pfp: pfpZoa, fullName: "Cho Hyewon", nickname: "혜워니" }
];

type ImpDate = { label: string, date: [number, number] }

export const IMP_EVENTS = [
	{ label: "Debut Anniversary", date: [5, 30] },
	{ label: "Daileee Day", date: [7, 23] },
	{ label: "We Are Release", date: [5, 30] },
	{ label: "We Can Release", date: [9, 13] },
	{ label: "We Play Release", date: [2, 17] },
	{ label: "Play Game: Holiday Release", date: [8, 4] },
	{ label: "Play Game: Awake Release", date: [2, 7] },
	{ label: "Good Day (Special Daileee) Release", date: [8, 12] },
	{ label: "Colorise Release", date: [9, 1] },
	{ label: "Stranger Release", date: [0, 25] },
	{ label: "Bliss Release", date: [6, 9] },
	{ label: "Lee Soojin Birthday", date: [11, 12] },
	{ label: "Kim Jimin Birthday", date: [4, 10] },
	{ label: "Park Soeun Birthday", date: [9, 26] },
	{ label: "Shin Jiyoon Birthday", date: [2, 2] },
	{ label: "Lee Jaehee Birthday", date: [3, 18] },
	{ label: "Han Jihyo  Birthday", date: [6, 12] },
	{ label: "Cho Hyewon Birthday", date: [4, 31] },
	{ label: "Test Event", date: [4, 13] },
	{ label: "Good Day (Special Daileee) Release", date: [4, 13] },
] satisfies ImpDate[]

export const LOCAL_STORAGE_ITEMS = {
	displayName: { key: "pref-display-name", default: "y/n" },
	memberShortcuts: { key: "pref-member-shortcuts", default: [] },
}

export const CHAT_CREDITS = [
	{
		member: "Lee Soojin",
		peeps: [
			{ name: "@earthtomoon510", link: "https://x.com/earthtomoon510" }
		]
	},
	{
		member: "Kim Jimin", peeps: [
			{ name: "Deisi" },
			{ name: "@earthtomoon510", link: "https://x.com/earthtomoon510" }
		]
	},
	{ member: "Park Soeun", peeps: [{ name: "WeeeklyFD", link: "https://x.com/FDVod" }] },
	{ member: "Shin Jiyoon", peeps: [{ name: "@notasianenuf", link: "https://x.com/notasianenuf" }] },
	{ member: "Lee Jaehee", peeps: [{ name: "WeeeklyFD", link: "https://x.com/FDVod" }] },
	{ member: "Han Jihyo", peeps: [{ name: "?" }] },
	{ member: "Cho Hyewon", peeps: [{ name: "Khenn" }] },
]
