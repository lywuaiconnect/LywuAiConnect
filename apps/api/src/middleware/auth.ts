import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

export const authMiddleware = jwt({
  secret: (c) => c.env.JWT_SECRET as string,
  alg: "HS256",
});
