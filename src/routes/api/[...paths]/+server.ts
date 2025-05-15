import { api } from "$lib/server";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ request }) => api.fetch(request)
