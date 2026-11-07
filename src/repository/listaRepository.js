const db = require("../config/database.js")

async function adicionarUmaLista(familia_id, nome){
    const sql = `
        INSERT INTO lista (familia_id, nome) 
        VALUES (?, ?);
    `

    const [result] = await db.execute(sql, [familia_id, nome])

    return {id: result.insertId}
}

async function verLista(){
    const sql = `
        SELECT l.id as lista_id, l.nome, l.criado_em, a.nome as alimento, i.quantidade, i.unidade, i.comprado
        FROM lista l
        LEFT JOIN itens_lista i on l.id = i.lista_id
        LEFT JOIN alimentos a on i.alimento_id = a.id;
    `

    const [result] = await db.query(sql)

    return result
}

async function existe(id){
       
    const sql1 = `
        SELECT * FROM itens_lista
        WHERE id = ?
    `

    const [result] = await db.execute(sql1, [id])

    return result[0]
}

async function update(id, novosDados){
    Object.keys(novosDados).forEach(key => {
        if(novosDados[key] === undefined){
            delete novosDados[key]
        }
    })

    const campos = Object.keys(novosDados)

    if(campos.length === 0){ return null }

    const query = campos.map(campo => `${campo} = ?`).join(', ')
    const sql2 = `
        UPDATE itens_lista SET ${query}
        WHERE id = ?
    `

    const valores = [...Object.values(novosDados), id]

    await db.execute(sql2, valores)

    return existe(id)
}


async function adicionarItemLista(lista_id, alimento_id, quantidade, unidade, comprado){
    const sql = `
        INSERT INTO itens_lista (lista_id, alimento_id, quantidade, unidade, comprado)
        VALUES (?, ?, ?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        lista_id, 
        alimento_id, 
        quantidade, 
        unidade, 
        comprado
    ])

    return { id: result.insertId }

}

module.exports = {
    adicionarUmaLista, 
    verLista, 
    existe,
    update,
    adicionarItemLista
}