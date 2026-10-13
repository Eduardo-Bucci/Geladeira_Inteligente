const db = require("../config/database.js")

async function cadastrarUsuarioRepo(req, res){
    const {nome, email, senha} = req.body

    const sql = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        nome,
        email,
        senha
    ])
}

module.exports = {
    cadastrarUsuarioRepo
}