// repositories/CommentRepository.ts
import { DbService } from "../services/DbService";
import { Comment } from "../models/Comment";

export class CommentRepository {
  private db: DbService;

  constructor() {
    this.db = DbService.getInstance();
  }

  async findAll(): Promise<Comment[]> {
    const result = await this.db.query(`SELECT * FROM comments`);
    return result.rows.map((row) => new Comment(row));
  }

  async findById(id: number): Promise<Comment | null> {
    const result = await this.db.query(`SELECT * FROM comments WHERE id = $1`, [id]);
    return result.rows[0] ? new Comment(result.rows[0]) : null;
  }

  async findByPostId(postid: number): Promise<Comment[]> {
    const result = await this.db.query(`SELECT * FROM comments WHERE postid = $1`, [postid]);
    return result.rows.map((row) => new Comment(row));
  }

  async findByUserId(userid: number): Promise<Comment[]> {
    const result = await this.db.query(`SELECT * FROM comments WHERE userid = $1`, [userid]);
    return result.rows.map((row) => new Comment(row));
  }

  async create(data: Omit<Comment, "id">): Promise<Comment> {
    const result = await this.db.query(
      `INSERT INTO comments (content, userid, postid) VALUES ($1, $2, $3) RETURNING *`,
      [data.content, data.userid, data.postid]
    );
    return new Comment(result.rows[0]);
  }

  async update(id: number, data: Partial<Omit<Comment, "id">>): Promise<Comment | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) return null;

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const values = Object.values(data);

    const result = await this.db.query(
      `UPDATE comments SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0] ? new Comment(result.rows[0]) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query(`DELETE FROM comments WHERE id = $1`, [id]);
    return result.rowCount! > 0;
  }
}
