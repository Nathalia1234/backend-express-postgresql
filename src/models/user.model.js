const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definição do schema do usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Antes de salvar, criptografa a senha automaticamente
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método auxiliar para comparar senha no login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporta o model
module.exports = mongoose.model('User', userSchema);
