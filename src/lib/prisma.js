import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const globalForPrisma = globalThis;

function getDatabasePath() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // On Vercel or production serverless, the deployment root (/var/task) is read-only.
  // SQLite needs write permissions to manage journal/lock files.
  // /tmp is the writable scratch space in serverless environments.
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const tmpDbPath = '/tmp/dev.db';

    if (!fs.existsSync(tmpDbPath)) {
      const taskRoot = process.env.LAMBDA_TASK_ROOT || '/var/task';
      const sourceDb = path.join(taskRoot, 'dev.db');

      let copied = false;
      if (fs.existsSync(sourceDb)) {
        try {
          fs.copyFileSync(sourceDb, tmpDbPath);
          copied = true;
        } catch (err) {
          console.error('Failed to copy database to /tmp:', err);
        }
      }

      if (!copied) {
        try {
          const rawDb = new Database(tmpDbPath);
          rawDb.exec(`
            CREATE TABLE IF NOT EXISTS "User" (
              "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
              "fullName" TEXT NOT NULL,
              "username" TEXT NOT NULL,
              "email" TEXT NOT NULL,
              "password" TEXT NOT NULL,
              "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");
            CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
          `);
          rawDb.close();
        } catch (err) {
          console.error('Failed to initialize database in /tmp:', err);
        }
      }
    }

    return `file:${tmpDbPath}`;
  }

  return 'file:./dev.db';
}

function makePrismaClient() {
  const dbUrl = getDatabasePath();
  const adapter = new PrismaBetterSqlite3({
    url: dbUrl,
  });

  return new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
  });
}

export const prisma = globalForPrisma.prisma ?? makePrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
