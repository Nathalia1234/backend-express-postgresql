import { pool } from "../database/connect.js";

export const NoteModel = {
  async create({ userId, title, content }) {
    const query = `
      INSERT INTO notes (user_id, title, content)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [userId, title, content];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAllByUser(userId) {
    const result = await pool.query("SELECT * FROM notes WHERE user_id = $1", [userId]);
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    return result.rows[0];
  },

  async update(id, { title, content }) {
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
  },
};
