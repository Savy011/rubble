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

export const LOCAL_STORAGE_KEYS = {
	displayName: "pref-display-name",
	memberShortcuts: "pref-member-shortcuts",
}
