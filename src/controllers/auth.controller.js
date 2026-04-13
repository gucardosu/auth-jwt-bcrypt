import { createUser, findUserByEmail } from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Cadastro
async function register(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    //Verifica se o usuario já existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email já existe!" });
    }
    //Caso nao exista, cria um novo user
    const user = await createUser(nome, email, senhaHash);
    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Login
async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Credenciais inválidas",
      });
    }
    const comparandoHash = await bcrypt.compare(senha, user.senha);

    if (!comparandoHash) {
      return res.status(401).json({
        message: "Credenciais inválidas",
      });
    }
    delete user.senha;
    //assinar e retornar o JWT
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    res.json({
      message: "Login realizado com sucesso",
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { register, login };
