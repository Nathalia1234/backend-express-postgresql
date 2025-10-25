import bcrypt from "bcrypt";
import { pool } from "../database/connect.js";

export const UserModel = {
  async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email;
    `;
    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query("SELECT id, name, email FROM users");
    return result.rows;
  },
};
