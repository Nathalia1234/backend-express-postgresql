import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  create,
  getAllNotes,
  getNoteById,
  updateNote,
  patchNote,
  deleteNote
}
from "../controllers/note.controller.js";

const router = express.Router();

//  Criar nota
router.post('/', verifyToken, create);

//  Listar todas as notas
router.get('/', verifyToken, getAllNotes);

//  Buscar nota por ID
router.get('/:id', verifyToken, getNoteById);

//  Atualizar nota (PUT)
router.put('/:id', verifyToken, updateNote);

//  Atualizar parcialmente nota (PATCH)
router.patch('/:id', verifyToken, patchNote);

//  Deletar nota
router.delete('/:id', verifyToken, deleteNote);

export default router;
