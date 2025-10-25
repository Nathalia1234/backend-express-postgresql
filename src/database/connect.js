import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await pool.connect();
    console.log("🟢 Conexão com PostgreSQL estabelecida com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar ao PostgreSQL:", error);
  }
};
