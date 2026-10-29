const db = require("../config/database.js")

async function cadastrarCategoriaRepo(nome){
    const sql = `
        INSERT INTO categorias (nome)
        VALUES (?)
    `

    const [result] = await db.execute(sql, [nome])

    return { id: result.insertId }
}


async function listarCategoriaRepo(){
    const sql = `
        SELECT id, nome
        FROM categorias
        ORDER BY id ASC
    `

    const [categorias] = await db.execute(sql)
    return categorias
}


async function excluirCategoria(id){
    const sql = `
        DELETE FROM categorias
        WHERE id = ?
    `

    const [result] = await db.execute(sql, [id])
    return result.affectedRows
}


async function cadastrarAlimentoRepo(categoria_id, nome, unidade_padrao){
    const sql = `
        INSERT INTO alimentos (categoria_id, nome, unidade_padrao) VALUES (?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        categoria_id,
        nome, 
        unidade_padrao
    ])

    return { id: result.insertId}
}


async function listarAlimentosRepo(){
    const sql = `
        SELECT categoria_id, nome, unidade_padrao
        FROM alimentos
        ORDER BY nome ASC
    `

    const [alimento] = await db.execute(sql)
    return alimento
}


async function excluirAlimento(id){
    const sql = `
        DELETE FROM alimentos
        WHERE id = ?
    `

    const [result] = await db.execute(sql, [id])

    return result.affectedRows
}


module.exports = {
    cadastrarCategoriaRepo,
    cadastrarAlimentoRepo,
    listarAlimentosRepo,
    listarCategoriaRepo,
    excluirCategoria,
    excluirAlimento
}