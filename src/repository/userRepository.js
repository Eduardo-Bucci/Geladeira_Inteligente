const db = require("../config/database.js")

async function cadastrarUsuarioRepo(nome, email, senha){

    const sql = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        nome,
        email,
        senha
    ])

    return { id: result.insertId}
}

module.exports = {
    cadastrarUsuarioRepo
}