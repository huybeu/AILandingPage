import path from 'path';
import fs from 'fs';
import initSqlJs from 'sql.js';

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH  = path.join(DATA_DIR, 'data.db');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sqlDb: any = null;

function persist(): void {
  const data: Uint8Array = sqlDb.export();
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export async function initDB(): Promise<void> {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    sqlDb = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    sqlDb = new SQL.Database();
  }

  sqlDb.run(`
    CREATE TABLE IF NOT EXISTS users (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT    NOT NULL,
      phone        TEXT    NOT NULL,
      email        TEXT    NOT NULL,
      title        TEXT    NOT NULL DEFAULT '',
      company      TEXT    NOT NULL DEFAULT '',
      learnType    TEXT    NOT NULL CHECK(learnType IN ('online','offline')),
      payStatus    TEXT    NOT NULL DEFAULT 'unpaid' CHECK(payStatus IN ('paid','pending','unpaid')),
      registeredAt TEXT    NOT NULL
    )
  `);
  persist();
}

type Param = string | number | null;

// Wrapper với API giống better-sqlite3
const db = {
  prepare(sql: string) {
    return {
      run(...params: Param[]): { lastInsertRowid: number; changes: number } {
        sqlDb.run(sql, params);
        const changes: number = sqlDb.getRowsModified();
        const rid = sqlDb.exec('SELECT last_insert_rowid()');
        const lastInsertRowid = Number(rid[0]?.values[0][0] ?? 0);
        persist();
        return { lastInsertRowid, changes };
      },

      get(...params: Param[]): Record<string, unknown> | undefined {
        const stmt = sqlDb.prepare(sql);
        stmt.bind(params);
        const result = stmt.step() ? (stmt.getAsObject() as Record<string, unknown>) : undefined;
        stmt.free();
        return result;
      },

      all(...params: Param[]): Record<string, unknown>[] {
        const stmt = sqlDb.prepare(sql);
        stmt.bind(params);
        const rows: Record<string, unknown>[] = [];
        while (stmt.step()) rows.push(stmt.getAsObject() as Record<string, unknown>);
        stmt.free();
        return rows;
      },
    };
  },
};

export default db;
