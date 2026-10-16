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

async function LoginRepo(email){

    const sql = `
    SELECT * FROM usuarios WHERE email = ? LIMIT 1
    `

    const [result] = await db.execute(sql, [
        email,
    ])

    if(result.length === 0){
        return null
    }
    
    return result[0]

}

module.exports = {
    cadastrarUsuarioRepo,
    LoginRepo
}