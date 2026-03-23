import { Pool, PoolClient } from "pg";
import * as dotenv from 'dotenv';

dotenv.config();
export class DbService {
  private static instance: DbService;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "user",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "mydb",
      port: Number(process.env.DB_PORT) || 5432,
    });
  }

  public static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }
    return DbService.instance;
  }

  public async getConnection(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  public async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  /**
 * 🔥 Initialize tables (Code First style)
 */
public async initializeTables(): Promise<void> {
  const client = await this.getConnection();

  try {
    await client.query("BEGIN");

    // ENUMS
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE post_type AS ENUM ('text', 'video');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await client.query(`
      DO $$ BEGIN
        CREATE TYPE action_type AS ENUM ('like', 'dislike', 'save');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // USERS
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      );
    `);

    // POSTS
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        userid INT NOT NULL,
        content TEXT NOT NULL,
        type post_type NOT NULL,
        FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // COMMENTS
    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        userid INT NOT NULL,
        postid INT NOT NULL,
        FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (postid) REFERENCES posts(id) ON DELETE CASCADE
      );
    `);

    // ACTIONS
    await client.query(`
      CREATE TABLE IF NOT EXISTS actions (
        id SERIAL PRIMARY KEY,
        type action_type NOT NULL,
        userid INT NOT NULL,
        postid INT,
        commentid INT,
        FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (postid) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (commentid) REFERENCES comments(id) ON DELETE CASCADE
      );
    `);

    // CHECK constraint — wrapped in DO block to safely skip if already exists
    await client.query(`
      DO $$ BEGIN
        ALTER TABLE actions
        ADD CONSTRAINT check_only_one_target
        CHECK (
          (postid IS NOT NULL AND commentid IS NULL) OR
          (postid IS NULL AND commentid IS NOT NULL)
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await client.query("COMMIT");
    console.log("✅ Tables initialized successfully");

  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error initializing tables:", error);
    throw error;
  } finally {
    client.release();
  }
}
}
