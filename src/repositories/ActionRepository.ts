// repositories/ActionRepository.ts
import { Action } from "../models/Action";
import { DbService } from "../services/DbService";

export class ActionRepository {
  private db: DbService;

  constructor() {
    this.db = DbService.getInstance();
  }

  async findAll(): Promise<Action[]> {
    const result = await this.db.query(`SELECT * FROM actions`);
    return result.rows.map((row) => new Action(row));
  }

  async findById(id: number): Promise<Action | null> {
    const result = await this.db.query(`SELECT * FROM actions WHERE id = $1`, [id]);
    return result.rows[0] ? new Action(result.rows[0]) : null;
  }

  async findByUserId(userid: number): Promise<Action[]> {
    const result = await this.db.query(`SELECT * FROM actions WHERE userid = $1`, [userid]);
    return result.rows.map((row) => new Action(row));
  }

  async findByPostId(postid: number): Promise<Action[]> {
    const result = await this.db.query(`SELECT * FROM actions WHERE postid = $1`, [postid]);
    return result.rows.map((row) => new Action(row));
  }

  async findByCommentId(commentid: number): Promise<Action[]> {
    const result = await this.db.query(`SELECT * FROM actions WHERE commentid = $1`, [commentid]);
    return result.rows.map((row) => new Action(row));
  }

  async create(data: Omit<Action, "id">): Promise<Action> {
    const result = await this.db.query(
      `INSERT INTO actions (type, userid, postid, commentid) VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.type, data.userid, data.postid ?? null, data.commentid ?? null]
    );
    return new Action(result.rows[0]);
  }

  async update(id: number, data: Partial<Omit<Action, "id">>): Promise<Action | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) return null;

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const values = Object.values(data);

    const result = await this.db.query(
      `UPDATE actions SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0] ? new Action(result.rows[0]) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query(`DELETE FROM actions WHERE id = $1`, [id]);
    return result.rowCount! > 0;
  }
}
