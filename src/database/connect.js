import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log('✅ Conexão com PostgreSQL estabelecida com sucesso!'))
  .catch((err) => console.error('❌ Erro ao conectar ao PostgreSQL:', err.message));
