import { db } from '../database/sqlite';

type UserRow = {
  id: number;
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
};

export function createUser(username: string, password: string): void {
  db.runSync(
  `INSERT INTO users (username, password, created_at) VALUES (?, ?, ?);`,
  [username.trim().toLowerCase(), password.trim(), new Date().toISOString()]
);
}

  export function findUserByUsername(username: string): User | null {
  const row = db.getFirstSync<UserRow>(
  `SELECT id, username, password FROM users WHERE username = ?`,
  [username.trim().toLowerCase()]
  );

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    username: row.username,
    password: row.password, 
  };
}


export function validateCredentials(username: string, password: string): boolean {
  const user = findUserByUsername(username);
  if (!user) {
    return false;
  }
  return user.password === password.trim();
}


