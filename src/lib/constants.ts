import pfpSoojin from "$lib/images/pfp_soojin.jpg"
import pfpMonday from "$lib/images/pfp_monday.jpg";
import pfpJiyoon from "$lib/images/pfp_jiyoon.jpg"
import pfpJaehee from "$lib/images/pfp_jaehee.jpg";
import pfpJihan from "$lib/images/pfp_jihan.jpg";
import pfpZoa from "$lib/images/pfp_zoa.jpg";

export const MEMBER_LIST = [
	"soojin",
	"monday",
	"soeun",
	"jiyoon",
	"jaehee",
	"jihan",
	"zoa"
]

export const APPS = [
	{ href: '/chat/soojin', label: 'Soojin', icon: '🐶', pfp: pfpSoojin, nickname: "🍓" },
	{ href: '/chat/monday', label: 'Monday', icon: '🐱', pfp: pfpMonday, nickname: "쩜🖤" },
	{ href: '/chat/soeun', label: 'Soeun', icon: '🐮', pfp: "", nickname: "소은이" },
	{ href: '/chat/jiyoon', label: 'Jiyoon', icon: '🐹', pfp: pfpJiyoon, nickname: "유니" },
	{ href: '/chat/jaehee', label: 'Jaehee', icon: '🐥', pfp: pfpJaehee, nickname: "재히공쥬" },
	{ href: '/chat/jihan', label: 'Jihan', icon: '🐰', pfp: pfpJihan, nickname: "지효 ❤️🎀" },
	{ href: '/chat/zoa', label: 'Zoa', icon: '🦌', pfp: pfpZoa, nickname: "혜워니" }
];

export const LOCAL_STORAGE_KEYS = {
	displayName: "pref-display-name",
	memberShortcuts: "pref-member-shortcuts",
}
