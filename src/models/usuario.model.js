import db from "../database/db.js";

async function createUser(nome, email, senhaHash) {
  try {
    //Convertendo a seha em hase
    const query = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
        RETURNING id, nome, email;
        `;
        const values = [nome, email, senhaHash];
        const result = await db.query(query, values);
        return result.rows[0];

  } catch (error) {
    console.log(error);
    return (error)
  }
}

async function findUserByEmail(email) {
    try {
        const result = await db.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return (error)
    }
}

export { createUser, findUserByEmail };