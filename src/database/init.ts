import { db } from './sqlite';

export function initDatabase() {
    db.runSync(`DROP TABLE IF EXISTS users;`);
  db.runSync(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    `
  );
}