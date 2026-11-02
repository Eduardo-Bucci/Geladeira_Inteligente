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

async function listarUsuariosFamilia(){

    const sql = `
        select familias.nome as nome_familia, 
        usuarios.nome as nome_usuario, 
        papel
        from familias
        inner join familia_usuarios on familias.id = familia_usuarios.familia_id
        inner join usuarios on familia_usuarios.usuario_id  = familia_usuarios.usuario_id;
    `

    const [result] = await db.execute(sql)

    return result
}


module.exports = {
    cadastrarFamilia,
    cadastrarUsuarioFamilia,
    listarUsuariosFamilia,
}