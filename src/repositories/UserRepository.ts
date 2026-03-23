// repositories/UserRepository.ts
import { DbService } from "../services/DbService";
import { User } from "../models/User";

export class UserRepository {
  private db: DbService;

  constructor() {
    this.db = DbService.getInstance();
  }

  async findAll(): Promise<User[]> {
    const result = await this.db.query(`SELECT * FROM users`);
    return result.rows.map((row) => new User(row));
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async create(data: Omit<User, "id">): Promise<User> {
    const result = await this.db.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
      [data.name, data.email]
    );
    return new User(result.rows[0]);
  }

  async update(id: number, data: Partial<Omit<User, "id">>): Promise<User | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) return null;

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const values = Object.values(data);

    const result = await this.db.query(
      `UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query(`DELETE FROM users WHERE id = $1`, [id]);
    return result.rowCount! > 0;
  }
}
