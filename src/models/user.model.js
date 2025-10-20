import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define o schema do usuário
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Middleware para criptografar a senha antes de salvar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senha
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Exporta o modelo
export default mongoose.model("User", userSchema);
