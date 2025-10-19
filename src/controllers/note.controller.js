const NoteService = require('../services/note.service');
const Note = require('../models/note.model');
const logger = require('../middlewares/logger');

// ----------------------
// Criar uma nova nota
// ----------------------
async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    // Validação simples
    if (!title || !content) {
      logger.logError(`Tentativa de criar nota com dados incompletos`);
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
    }

    const note = new Note({
      userId: req.user.id,
      title,
      content
    });

    await note.save();

    logger.logInfo(
      `🟢 Usuário ${req.user.id} criou nota com sucesso (ID da Nota: ${note._id})`
    );
    return res.status(201).json(note);
  } catch (error) {
    logger.logError(`Erro ao criar nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao criar nota.' });
  }
}

// ----------------------
// Listar todas as notas (com ou sem filtro)
// ----------------------
async function getAllNotes(req, res) {
  try {
    const userId = req.user.id;
    const filter = req.query && Object.keys(req.query).length > 0 ? req.query : {};

    const notes = await Note.find({ userId, ...filter });

    if (Object.keys(filter).length > 0) {
      logger.logInfo(
        `🟡 Usuário ${userId} listou notas com filtro: ${JSON.stringify(filter)}`
      );
    } else {
      logger.logInfo(`🟡 Usuário ${userId} listou todas as notas`);
    }

    return res.status(200).json(notes);
  } catch (error) {
    logger.logError(`Erro ao listar notas: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao listar notas.' });
  }
}


// ----------------------
//  Buscar nota por ID
// ----------------------
async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Nota ${req.params.id} não encontrada`);
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }

    if (note.userId.toString() !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou acessar nota de outro usuário`);
      return res.status(403).json({ error: 'Acesso negado.' });
    }

    logger.logInfo(`🔵 Usuário ${req.user.id} acessou nota ${req.params.id}`);
    return res.status(200).json(note);
  } catch (error) {
    logger.logError(`Erro ao buscar nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao buscar nota.' });
  }
}

// ----------------------
// Atualizar nota (PUT )
// ----------------------
async function updateNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Tentativa de atualizar nota inexistente (${req.params.id})`);
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }

    if (note.userId.toString() !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou atualizar nota de outro usuário`);
      return res.status(403).json({ error: 'Acesso negado.' });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();

    logger.logInfo(`🟠 Usuário ${req.user.id} atualizou nota ${note._id}`);
    return res.status(200).json(note);
  } catch (error) {
    logger.logError(`Erro ao atualizar nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao atualizar nota.' });
  }
}

// Atualizar parcialmente nota (PATCH)
async function patchNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Tentativa de atualização parcial em nota inexistente (${req.params.id})`);
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }

    if (note.userId.toString() !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou modificar nota de outro usuário`);
      return res.status(403).json({ error: 'Acesso negado.' });
    }

    Object.assign(note, req.body);
    await note.save();

    logger.logInfo(`🟣 Usuário ${req.user.id} atualizou parcialmente nota ${note._id}`);
    return res.status(200).json(note);
  } catch (error) {
    logger.logError(`Erro ao atualizar parcialmente nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao atualizar nota parcialmente.' });
  }
}

// ----------------------
// Deletar nota
// ----------------------
async function deleteNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Tentativa de deletar nota inexistente (${req.params.id})`);
      return res.status(404).json({ error: 'Nota não encontrada.' });
    }

    if (note.userId.toString() !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou deletar nota de outro usuário`);
      return res.status(403).json({ error: 'Acesso negado.' });
    }

    await note.deleteOne();

    logger.logInfo(`🔴 Usuário ${req.user.id} deletou nota ${req.params.id}`);
    return res.status(200).json({
  message: `Nota ${req.params.id} deletada com sucesso!`
});
  } catch (error) {
    logger.logError(`Erro ao deletar nota: ${error.message}`);
    return res.status(500).json({ error: 'Erro ao deletar nota.' });
  }
}

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  patchNote,
  deleteNote
};
