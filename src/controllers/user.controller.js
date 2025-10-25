import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { logger } from "../middlewares/logger.js";
import { UserModel } from "../models/user.model.js";

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

// -----------------------------
// REGISTRO DE USUÁRIO
// -----------------------------
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      logger.logWarn(`Tentativa de cadastro com campos vazios`);
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      logger.logWarn(`Tentativa de cadastro com e-mail já existente: ${email}`);
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    const newUser = await UserModel.create({ name, email, password });

    logger.logInfo(`Novo usuário registrado: ${email}`);
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    logger.logError(`Erro no registro de usuário: ${error.message}`);
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
}

// -----------------------------
// LOGIN DE USUÁRIO
// -----------------------------
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      logger.logWarn(`Tentativa de login com campos vazios`);
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      logger.logWarn(`Tentativa de login com e-mail não cadastrado: ${email}`);
      return res.status(400).json({ error: "E-mail não cadastrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.logWarn(`Tentativa de login com senha incorreta: ${email}`);
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = generateToken(user);

    logger.logInfo(`Usuário autenticado com sucesso: ${email}`);
    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
    });
  } catch (error) {
    logger.logError(`Erro no login: ${error.message}`);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
}

// -----------------------------
// PERFIL DO USUÁRIO
// -----------------------------
export async function getProfile(req, res) {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      logger.logWarn(`Usuário não encontrado ao buscar perfil (ID: ${req.user.id})`);
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    logger.logInfo(`Usuário acessou seu perfil: ${user.email}`);
    return res.status(200).json(user);
  } catch (error) {
    logger.logError(`Erro ao buscar perfil: ${error.message}`);
    return res.status(500).json({ error: "Erro ao buscar perfil do usuário" });
  }
}

// -----------------------------
// LISTAR TODOS OS USUÁRIOS
// -----------------------------
export async function listAll(req, res) {
  try {
    const users = await UserModel.findAll();
    logger.logInfo(`Listagem de usuários retornada (${users.length} encontrados)`);
    return res.status(200).json(users);
  } catch (error) {
    logger.logError(`Erro ao listar usuários: ${error.message}`);
    return res.status(500).json({ error: "Erro ao listar usuários." });
  }
}
