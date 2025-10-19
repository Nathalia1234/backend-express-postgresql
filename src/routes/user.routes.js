const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

// Rota de cadastro
//cria um novo usuário.
router.post('/register', userController.register);

// Rota de login
// autentica e retorna o token JWT.
router.post('/login', userController.login);

// Rota protegida (perfil do usuário)
// rota protegida que só pode ser acessada com token válido (usando verifyToken).
router.get('/profile', verifyToken, userController.getProfile);

// Rota para listar todos os usuários (apenas para testes internos)
router.get('/users', userController.listAll);


module.exports = router;
