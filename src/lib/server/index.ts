import { Hono } from "hono";

export const router = new Hono()
	.get("/messages", c => c.text("Hello"))

export const api = new Hono().route("/api", router);

export type Router = typeof router;
