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

async function validacaoToken(usuario_id){

    const sql = `
        SELECT familia_id FROM familia_usuarios WHERE usuario_id = ? LIMIT 1
    `

    const [pivo] = await db.execute(sql, [usuario_id])

    return {pivo, usuario_id}
}


async function listarUsuariosRepo() {
    const sql = `
        SELECT id, nome, email
        FROM usuarios
        ORDER BY id DESC
    `;

    const [usuarios] = await db.execute(sql);
    return usuarios;
}

async function excluirUsuarioRepo(id) {
    const sql = `
        DELETE FROM usuarios
        WHERE id = ?
    `;

    const [resultado] = await db.execute(sql, [id]);
    return resultado.affectedRows;
}



module.exports = {
    cadastrarUsuarioRepo,
    LoginRepo,
    validacaoToken,
    listarUsuariosRepo,
    excluirUsuarioRepo
}