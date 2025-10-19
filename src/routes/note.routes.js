const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  patchNote,
  deleteNote
} = require('../controllers/note.controller');

//  Criar nota
router.post('/', verifyToken, createNote);

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

module.exports = router;
