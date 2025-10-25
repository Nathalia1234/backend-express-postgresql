import { NoteModel } from "../models/note.model.js";
import { logger } from "../middlewares/logger.js";

// ----------------------
// Criar nova nota
// ----------------------
export async function create(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      logger.logError(`Tentativa de criar nota com dados incompletos`);
      return res.status(400).json({ error: "Título e conteúdo são obrigatórios." });
    }

    const note = await NoteModel.create({
      userId: req.user.id,
      title,
      content,
    });

    logger.logInfo(`🟢 Usuário ${req.user.id} criou nota com sucesso (ID: ${note.id})`);
    return res.status(201).json(note);
  } catch (error) {
    logger.logError(`Erro ao criar nota: ${error.message}`);
    return res.status(500).json({ error: "Erro ao criar nota." });
  }
}

// ----------------------
// Listar notas
// ----------------------
export async function getAllNotes(req, res) {
  try {
    const userId = req.user.id;
    const notes = await NoteModel.findAllByUser(userId);

    if (req.query.title) {
      const filter = req.query.title.toLowerCase();
      const filtered = notes.filter((n) => n.title.toLowerCase().includes(filter));
      return res.status(200).json(filtered);
    }

    logger.logInfo(`🟢 Usuário ${req.user.id} listou ${notes.length} notas`);
    return res.status(200).json(notes);
  } catch (error) {
    logger.logError(`Erro ao listar notas: ${error.message}`);
    return res.status(500).json({ error: "Erro ao listar notas." });
  }
}

// ----------------------
// Buscar nota por ID
// ----------------------
export async function getNoteById(req, res) {
  try {
    const note = await NoteModel.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Nota ${req.params.id} não encontrada`);
      return res.status(404).json({ error: "Nota não encontrada." });
    }

    if (note.user_id !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou acessar nota de outro usuário`);
      return res.status(403).json({ error: "Acesso negado. Esta nota pertence a outro usuário." });
    }

    logger.logInfo(`🔵 Usuário ${req.user.id} acessou nota ${req.params.id}`);
    return res.status(200).json(note);
  } catch (error) {
    logger.logError(`Erro ao buscar nota: ${error.message}`);
    return res.status(500).json({ error: "Erro ao buscar nota." });
  }
}

// ----------------------
// Atualizar nota completa
// ----------------------
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = await NoteModel.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Tentativa de atualizar nota inexistente (${req.params.id})`);
      return res.status(404).json({ error: "Nota não encontrada." });
    }

    if (note.user_id !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou atualizar nota de outro usuário`);
      return res.status(403).json({ error: "Acesso negado. Você não pode editar notas de outro usuário." });
    }

    const updated = await NoteModel.update(req.params.id, { title, content });

    logger.logInfo(`🟠 Usuário ${req.user.id} atualizou nota ${req.params.id}`);
    return res.status(200).json(updated);
  } catch (error) {
    logger.logError(`Erro ao atualizar nota: ${error.message}`);
    return res.status(500).json({ error: "Erro ao atualizar nota." });
  }
}

// ----------------------
// Atualizar nota parcialmente
// ----------------------
export async function patchNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Busca nota
    const note = await NoteModel.findById(id);

    if (!note) {
      logger.logWarn(`Tentativa de atualização parcial em nota inexistente (${id})`);
      return res.status(404).json({ error: "Nota não encontrada." });
    }

    if (note.user_id !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou modificar nota de outro usuário`);
      return res.status(403).json({ error: "Acesso negado. Você não pode editar notas de outro usuário." });
    }

    // Atualiza apenas os campos enviados
    const newTitle = title ?? note.title;
    const newContent = content ?? note.content;

    const updated = await NoteModel.update(id, {
      title: newTitle,
      content: newContent,
    });

    logger.logInfo(`🟣 Usuário ${req.user.id} atualizou parcialmente nota ${id}`);
    return res.status(200).json(updated);
  } catch (error) {
    logger.logError(`Erro ao atualizar parcialmente nota: ${error.message}`);
    return res.status(500).json({ error: "Erro ao atualizar nota parcialmente." });
  }
}

// ----------------------
// Deletar nota
// ----------------------
export async function deleteNote(req, res) {
  try {
    const note = await NoteModel.findById(req.params.id);

    if (!note) {
      logger.logWarn(`Tentativa de deletar nota inexistente (${req.params.id})`);
      return res.status(404).json({ error: "Nota não encontrada." });
    }

    if (note.user_id !== req.user.id) {
      logger.logWarn(`Usuário ${req.user.id} tentou deletar nota de outro usuário`);
      return res.status(403).json({ error: "Acesso negado. Você não pode deletar notas de outro usuário." });
    }

    await NoteModel.delete(req.params.id);

    logger.logInfo(`🔴 Usuário ${req.user.id} deletou nota ${req.params.id}`);
    return res.status(200).json({ message: `Nota ${req.params.id} deletada com sucesso!` });
  } catch (error) {
    logger.logError(`Erro ao deletar nota: ${error.message}`);
    return res.status(500).json({ error: "Erro ao deletar nota." });
  }
}
