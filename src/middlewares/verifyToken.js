import jwt from "jsonwebtoken";
import { logger } from "./logger.js";

// -----------------------------
// Middleware de verificação do token JWT
// -----------------------------
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se o header Authorization existe e começa com "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.logWarn("Tentativa de acesso sem token.");
    return res.status(401).json({ error: "Token ausente. Acesso não autorizado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    logger.logInfo(`🟢 Token válido para o usuário ID: ${decoded.id}`);
    next();
  } catch (error) {
    logger.logError(`Token inválido ou expirado: ${error.message}`);
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
