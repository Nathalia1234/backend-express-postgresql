import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const connectDatabase = async () => {
  try {
    await pool.connect();
    console.log("🟢 Conexão com PostgreSQL estabelecida com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar ao PostgreSQL:", error);
  }
};

// Exporta o pool para os models usarem
export { pool };
