const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./src/database/connect');
const userRoutes = require('./src/routes/user.routes');
const noteRoutes = require('./src/routes/note.routes');


// carrega as variáveis de ambiente (.env).
dotenv.config(); 

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// conecta ao MongoDB Atlas.
connectDatabase();


// registra as rotas de usuário com prefixo /api.
app.use('/api', userRoutes);
app.use('/api/notes', noteRoutes);

// A rota base / é só pra teste local e pra mostrar no deploy que está funcionando.
app.get('/', (req, res) => {
  res.send('✅ API está rodando com sucesso!');
});

// Porta de execução local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

// O module.exports = app garante que o Vercel consiga rodar a API no ambiente serverless.
module.exports = app;
