import type { Handle } from "@sveltejs/kit";
export const handle: Handle = async ({ event, resolve }) => {
	const { url, request, locals } = event;

	return resolve(event, {
		preload: ({type}) => {
			return type === 'font' || type === 'js' || type === 'css';
		}
	});
}
