// Esse middleware é usado em qualquer rota que precise de autenticação.
// Ele pega o token do cabeçalho Authorization, valida com jwt.verify() e adiciona os dados decodificados (req.user) para uso nas rotas seguintes.
// Se o token estiver ausente ou inválido, retorna 401 Unauthorized.
// src/middlewares/verifyToken.js
const jwt = require('jsonwebtoken');
const logger = require('./logger');

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    logger.logWarn(`Tentativa de acesso sem token`);
    return res.status(401).json({ error: 'Token ausente. Acesso não autorizado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded terá { id, name, email, iat, exp }
    next();
  } catch (error) {
    logger.logError(`Token inválido: ${error.message}`);
    return res.status(403).json({ error: 'Token inválido.' });
  }
}

module.exports = verifyToken;

