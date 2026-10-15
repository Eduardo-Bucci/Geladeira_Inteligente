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

    return { id: result.insertId }
}

async function LoginRepo(email, senha){

    const sql = `
    SELECT * FROM usuarios WHERE email = ?
    `

    const [result] = await db.execute(sql, [
        email,
        senha
    ])

    return { email: result.email }

}

module.exports = {
    cadastrarUsuarioRepo,
    LoginRepo
}