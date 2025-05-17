import { api } from "$lib/server"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = ({ request }) => api.handle(request)
