const Note = require('../models/note.model');

async function createNote(userId, data) {
  return await Note.create({ ...data, userId });
}

async function getAllNotes(userId) {
  return await Note.find({ userId }).sort({ updatedAt: -1 });
}

async function getAllNotesFiltered(filters) {
  return await Note.find(filters).sort({ updatedAt: -1 });
}

async function getAllNotesFiltered(filters) {
  return await Note.find(filters).sort({ updatedAt: -1 });
}

async function getNoteById(userId, id) {
  return await Note.findOne({ _id: id, userId });
}

async function updateNote(userId, id, data) {
  return await Note.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
    runValidators: true
  });
}

async function deleteNote(userId, id) {
  return await Note.findOneAndDelete({ _id: id, userId });
}

module.exports = {
  createNote,
  getAllNotes,
  getAllNotesFiltered, 
  getNoteById,
  updateNote,
  deleteNote
};

