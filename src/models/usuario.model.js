import db from "../database/db";
import bcrypt from 'bcryptjs';

async function createUser(nome, email, senha) {
    try {
        //Convertendo a seha em hase
        const senhaHash = await bcrypt.hash(senha, 10);
    } catch (error) {
        
    }
}