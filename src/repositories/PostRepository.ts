// repositories/PostRepository.ts
import { DbService } from "../services/DbService";
import { Post, PostType } from "../models/Post";

export class PostRepository {
  private db: DbService;

  constructor() {
    this.db = DbService.getInstance();
  }

  async findAll(): Promise<Post[]> {
    const result = await this.db.query(`SELECT * FROM posts`);
    return result.rows.map((row) => new Post(row));
  }

  async findById(id: number): Promise<Post | null> {
    const result = await this.db.query(`SELECT * FROM posts WHERE id = $1`, [id]);
    return result.rows[0] ? new Post(result.rows[0]) : null;
  }

  async findByUserId(userid: number): Promise<Post[]> {
    const result = await this.db.query(`SELECT * FROM posts WHERE userid = $1`, [userid]);
    return result.rows.map((row) => new Post(row));
  }

  async create(data: Omit<Post, "id">): Promise<Post> {
    const result = await this.db.query(
      `INSERT INTO posts (title, userid, content, type) VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.title, data.userid, data.content, data.type]
    );
    return new Post(result.rows[0]);
  }

  async update(id: number, data: Partial<Omit<Post, "id">>): Promise<Post | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) return null;

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const values = Object.values(data);

    const result = await this.db.query(
      `UPDATE posts SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0] ? new Post(result.rows[0]) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    return result.rowCount! > 0;
  }
}
