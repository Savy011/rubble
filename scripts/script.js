messagesEl = document.querySelectorAll("thing.name");
output = [];

for (let i = 0; i <= messagesEl.length - 1; i++) {
	let el = messagesEl[i];

	let child = el.querySelector("p.korean-font")
	let time = el.querySelector("time");

	if (child) {
		let innerHTML = child.innerHTML
			.replaceAll("<br>", "\n]")
			.replaceAll("(이름)", "[y/n]");

		let translation = el.querySelector("p2.translation")
			.innerHTML
			.replaceAll("<br>", "\n]")
			.replaceAll("(이름)", "[y/n]");

		output = [...output, {
			type: "text",
			text: innerHTML,
			translation
		}]

		continue
	}

	let sticker = el.querySelector(".emoticon > img")

	if (sticker) {
		let src = sticker.attributes
			.getNamedItem("src")
			.value

		output = [...output, {
			type: "sticker",
			text: "/Sticker/",
			src
		}]
		continue
	}

	let img = el.querySelector(".msg > img")

	if (img) {
		let src = img.attributes
			.getNamedItem("src")
			.value

		output = [...output, {
			type: "photo",
			text: "(Photo)",
			src
		}]
		continue
	}

	let audio = el.querySelector("audio")
	if (audio) {
		let src = audio.firstElementChild
			.attributes
			.getNamedItem("src")
			.value

		output = [...output, {
			type: "audio",
			text: "(Voice Message)",
			src
		}]
		continue
	}
}

console.log("Input Length:", messagesEl.length);
console.log("Output Length:", output.length);

copy(output)
