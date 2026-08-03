import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import { dirname } from "path";

export function createConnection(
  path: string = ":memory:",
): Database.Database {
  if (path !== ":memory:") {
    mkdirSync(dirname(path), { recursive: true });
  }
  const db = new Database(path);
  db.pragma("journal_mode = WAL");
  return db;
}
