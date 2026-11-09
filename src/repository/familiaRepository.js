const db = require("../config/database.js")

async function cadastrarFamilia(nome, codigo_convite){

    const sql = `
        INSERT INTO familias (nome, codigo_convite) 
        VALUES (?, ?)
    `

    const [result] = await db.execute(sql, [nome, codigo_convite])

    return {id: result.insertId}
}

async function cadastrarUsuarioFamilia(familyId, userId, papel){

    const sql = `
        INSERT INTO familia_usuarios (familia_id, usuario_id, papel)
        VALUES (?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        familyId,
        userId, 
        papel
    ])

    return { userID: result.familia_id}
}

async function vereficarMembro(userId, familyId){
    const sql = `
        SELECT * FROM familia_usuarios WHERE usuario_id = ? AND familia_id = ? LIMIT 1;
    `
    const [result] = await db.execute(sql, [userId, familyId])

    return result.length > 0
}

async function buscarPorCodigo(codigo_convite){
    const sql = `
        SELECT * FROM familias WHERE codigo_convite = ? LIMIT 1;
    `
    const [result] = await db.execute(sql, [codigo_convite])

    return result.length > 0 ? result[0] : null
}

async function listarUsuariosFamilia(familyId){

    const sql = `
        SELECT familias.nome as nome_familia, 
        usuarios.nome as nome_usuario, 
        papel
        FROM familias
        INNER JOIN familia_usuarios on familias.id = familia_usuarios.familia_id
        INNER JOIN usuarios on familia_usuarios.usuario_id = usuarios.id
        WHERE familia_id = ?;
    `

    const [result] = await db.execute(sql, [familyId])

    return result
}


module.exports = {
    cadastrarFamilia,
    cadastrarUsuarioFamilia,
    vereficarMembro,
    buscarPorCodigo,
    listarUsuariosFamilia,
}