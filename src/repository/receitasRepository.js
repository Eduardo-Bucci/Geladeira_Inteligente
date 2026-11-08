const db = require("../config/database.js")

async function salvarReceita(dadosReceita){
    const sql = `
        INSERT INTO receitas (nome, descricao, dificuldade, tipo_refeicao, instrucoes)
        VALUES (?, ?, ?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        dadosReceita.nome,
        dadosReceita.descricao,
        dadosReceita.dificuldade,
        dadosReceita.tipo_refeicao,
        dadosReceita.instrucoes
    ])

    return result.insertId
}

async function vincularIngrediente(receita_id, alimento_id){
    const sql = `
        INSERT INTO receita_ingredientes (receita_id, alimento_id)
        VALUES (?, ?)
    `

    const [result] = await db.execute(sql, [receita_id, alimento_id])

    return result.affectedRows > 0
}

async function buscarReceitasCompativeis(familyId){
    const sql = `
        SELECT 
            r.id AS receita_id,
            r.nome AS receita_titulo,
            r.descricao AS receita_descricao,
            r.dificuldade AS receita_dificuldade,
            r.tipo_refeicao AS receita_tipo,
            r.instrucoes AS receita_preparo,
            COUNT(ri.alimento_id) AS total_ingredientes_necessarios,
            SUM(CASE WHEN e.alimento_id IS NOT NULL THEN 1 ELSE 0 END) AS ingredientes_que_eu_tenho
        FROM receitas r
        INNER JOIN receita_ingredientes ri ON r.id = ri.receita_id
        LEFT JOIN estoque_alimentos e ON ri.alimento_id = e.alimento_id AND e.familia_id = ?
        GROUP BY r.id, r.nome, r.descricao, r.dificuldade, r.tipo_refeicao, r.instrucoes
        ORDER BY ingredientes_que_eu_tenho DESC;
    `

    const [result] = await db.execute(sql, [familyId])

    return result
}

module.exports = {
    salvarReceita,
    vincularIngrediente,
    buscarReceitasCompativeis
}