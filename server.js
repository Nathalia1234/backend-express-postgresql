import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./src/database/connect.js";

//import { pool } from "./src/database/connect.js"; 
import userRoutes from "./src/routes/user.routes.js";
import noteRoutes from "./src/routes/note.routes.js";

// -----------------------------
// Carrega as variáveis de ambiente (.env)
// -----------------------------
dotenv.config();


// -----------------------------
// Inicializa o app Express
// -----------------------------
const app = express();

// -----------------------------
// Conexão com o PostgreSQL
// -----------------------------
pool.connect()

// -----------------------------
// Middlewares globais
// -----------------------------
app.use(cors());
app.use(express.json());


// -----------------------------
// Rotas principais
// -----------------------------
app.use('/api', userRoutes);
app.use('/api/notes', noteRoutes);

// -----------------------------
// Rota base — para teste local e vercel
// -----------------------------
app.get("/", (req, res) => {
  res.send("✅ API está rodando com sucesso!");
});

// -----------------------------
// Porta de execução
// -----------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

// -----------------------------
// Export do app — necessário pro Vercel
// -----------------------------
export default app;
