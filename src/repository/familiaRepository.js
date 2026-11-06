const db = require("../config/database.js")

async function cadastrarFamilia(nome){

    const sql = `
        INSERT INTO familias (nome) 
        VALUES (?)
    `

    const [result] = await db.execute(sql, [nome])

    return {id: result.insertId}
}

async function cadastrarUsuarioFamilia(familia_id, usuario_id, papel){

    const sql = `
        INSERT INTO familia_usuarios (familia_id, usuario_id, papel)
        VALUES (?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        familia_id,
        usuario_id, 
        papel
    ])

    return { userID: result.familia_id}
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
    listarUsuariosFamilia,
}