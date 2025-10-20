import express from "express";
import * as userController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// Cria o roteador do Express
const router = express.Router();


// -----------------------------
// Rota de cadastro (registro)
// -----------------------------
router.post("/register", userController.register);


// -----------------------------
// Rota de login (autenticação)
// -----------------------------
router.post("/login", userController.login);


// -----------------------------
// Rota protegida - Perfil do usuário
// Só pode ser acessada com token válido
// -----------------------------
router.get("/profile", verifyToken, userController.getProfile);

// -----------------------------
// Rota para listar todos os usuários (uso interno/teste)
// -----------------------------
router.get("/users", userController.listAll);

// Exporta o roteador
export default router;



