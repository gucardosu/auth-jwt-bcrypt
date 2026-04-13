import {
  createUser,
  findUserByEmail,
} from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Cadastro
async function register(req, res) {
  const { nome, email, senhaHash } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    //Verifica se o usuario já existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email já existe!" });
    }
    //Caso nao exista, cria um novo user
    const user = await createUser(nome, email, senha);
    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { register }