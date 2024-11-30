import { Hono, Context } from "@hono/hono";

const app = new Hono();

app.get("/", (c: Context) => {
  return c.text("hello from Deno + Hono");
});

Deno.serve(app.fetch);
