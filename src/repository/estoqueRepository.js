const db = require("../config/database.js")

async function cadastrarEstoque(familia_id, alimento_id, quantidade, validade, custo_total, estado){

    const sql = `
        INSERT INTO estoque_alimentos (familia_id, alimento_id, quantidade, validade, custo_total, estado) 
        VALUES (?, ?, ?, ?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        familia_id, 
        alimento_id, 
        quantidade, 
        validade, 
        custo_total, 
        estado
    ])

    return { id: result.insertId}

}

async function verEstoque(){
    const sql = `
        SELECT * FROM estoque_alimentos
    ` 

    const [result] = await db.execute(sql)

    return result
}

async function moverHistorico(estoque_id, tipo_movimentacao, quantidade){
    const sql = `
        
    `

    const [result] = await db.execute(sql, [
        tipo_movimentacao, 
        quantidade,
        estoque_id
    ])

    return {id: result.insertId}
}

async function verHistorico(){
    const sql = `
        SELECT estoque_alimentos.alimento_id as id_alimento, 
               estoque_alimentos.validade as validade, 
               tipo_movimentacao
        FROM estoque_alimentos
        INNER JOIN historico_alimentos on historico_alimentos.estoque_id = estoque_alimentos.id;
    `

    const [result] = await db.execute(sql)

    return result
}


module.exports = {
    cadastrarEstoque,
    verEstoque,
    moverHistorico,
    verHistorico

}