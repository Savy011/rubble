export function capitalize(str: string) {
	return str
		.split('')
		.map((char, idx) =>
			idx === 0
				? char.toUpperCase()
				: char)
		.join('');
};

export function formatLiveDuration(duration: number) {
	const sec = duration % 60;
	const min = (duration - sec) / 60;

	if (min >= 60) {
		const hour = min / 60;
		const reminderMins = min % 60;

		return `${hour.toString().padStart(2, "0")}:${reminderMins.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
	} else {
		return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
	}
}

export function formatDay(day: number) {
	switch (day) {
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";
		default:
			return "";
	}
}

export function formatMonth(month: number) {
	switch (month) {
		case 0:
			return "January";
		case 1:
			return "February";
		case 2:
			return "March";
		case 3:
			return "April";
		case 4:
			return "May";
		case 5:
			return "June";
		case 6:
			return "July";
		case 7:
			return "August";
		case 8:
			return "September";
		case 9:
			return "October";
		case 10:
			return "November";
		case 11:
			return "December";
		default:
			return "";
	}
}
