import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const { url, request, locals } = event;

	const referer = request.headers.get('Referer');
	if (referer) {
		const urlReferer = new URL(referer);

		if (urlReferer.origin === url.origin) {
			locals.internalReferer = urlReferer
		}
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%splash-skip%', String(!!locals.internalReferer)),
		preload: ({type}) => {
			return type === 'font' || type === 'js' || type === 'css';
		}
	});
}
