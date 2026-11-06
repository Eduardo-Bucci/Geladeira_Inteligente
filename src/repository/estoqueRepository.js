const db = require("../config/database.js")

async function cadastrarEstoque(familyId, alimento_id, quantidade, validade, custo_total, estado){

    const sql = `
        INSERT INTO estoque_alimentos (familia_id, alimento_id, quantidade, validade, custo_total, estado) 
        VALUES (?, ?, ?, ?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        familyId, 
        alimento_id, 
        quantidade, 
        validade, 
        custo_total, 
        estado
    ])

    return { id: result.insertId}

}

async function verEstoque(familyId){
    const sql = `
        SELECT estoque_alimentos.id as id,
               alimentos.nome as nome, 
               estoque_alimentos.validade, 
               estoque_alimentos.quantidade,
               estoque_alimentos.custo_total,
               estoque_alimentos.estado
        FROM alimentos
        INNER JOIN estoque_alimentos on estoque_alimentos.alimento_id = alimentos.id
        WHERE ativo = 1
        AND familia_id = ?;
    ` 

    const [result] = await db.execute(sql, [familyId])

    return result
}

async function moverHistorico(quantidade, custo_total, idE, tipo_movimentacao){
    const conexao = await db.getConnection()

    try {
        await conexao.beginTransaction()

        const sql1 = `
            INSERT INTO historico_alimentos (estoque_id, familia_id quantidade, custo, tipo_movimentacao)
            SELECT id, familia_id, ?, ?, ?
            FROM estoque_alimentos 
            WHERE id = ?;
        `
        const [result] = await conexao.execute(sql1, [quantidade, custo_total, tipo_movimentacao, idE])

        const sql2 = `
            UPDATE estoque_alimentos 
            SET ativo = FALSE
            WHERE id = ?;
        `
        await conexao.execute(sql2, [idE])

        await conexao.commit()

        return { id:  result.insertId,
                sucesso: true };

    } catch (error) {
        await conexao.rollback();
        throw new Error("Erro durante a transação de histórico " + error.message); 
    }
    finally{
        conexao.release()
    }
}

async function verHistorico(familyId){

    const sql = `
        SELECT * FROM historico_alimentos
        WHERE familia_id = ?
    `

    /*const sql = `
        SELECT estoque_alimentos.alimento_id as id_alimento, 
               estoque_alimentos.validade as validade, 
               tipo_movimentacao
        FROM estoque_alimentos
        INNER JOIN historico_alimentos on historico_alimentos.estoque_id = estoque_alimentos.id
        where ativo = 1;;

    `*/

    const [result] = await db.execute(sql, [familyId])

    return result
}

async function excluirItemEstoque(id){
    const sql = `
        DELETE FROM estoque_alimentos
        WHERE id = ?
    `

    const [resultado] = await db.execute(sql, [id])

    return resultado.affectedRows
}


module.exports = {
    cadastrarEstoque,
    verEstoque,
    moverHistorico,
    verHistorico,
    excluirItemEstoque
}