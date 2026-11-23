import { createClient } from '@libsql/client';

export function createDbClient(env: { DB: D1Database }) {
  // Use D1 directly via bindings in production
  return {
    exec: (sql: string) => env.DB.exec(sql),
    prepare: (sql: string) => env.DB.prepare(sql),
    batch: (stmts: any[]) => env.DB.batch(stmts),
  };
}
