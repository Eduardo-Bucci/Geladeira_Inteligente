const db = require("../config/database.js")

async function cadastrarEstoque(familia_id, alimento_id, quantidade, validade, custo_total, estado, local_armazenamento){

    const sql = `
        INSERT INTO estoque_alimentos (familia_id, alimento_id, quantidade, validade,custo_total, estado, local_armazenamento)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        familia_id, 
        alimento_id, 
        quantidade, 
        validade, 
        custo_total, 
        estado,
        local_armazenamento
    ])

    return { id: result.insertId}

}

async function verEstoque(){
    const sql = `
        SELECT
            estoque_alimentos.id AS id,
            alimentos.id AS alimento_id,
            alimentos.nome AS nome,
            alimentos.unidade_padrao AS unidade,
            estoque_alimentos.validade,
            estoque_alimentos.quantidade,
            estoque_alimentos.custo_total,
            estoque_alimentos.estado,
            estoque_alimentos.local_armazenamento
        FROM alimentos
        INNER JOIN estoque_alimentos
            ON estoque_alimentos.alimento_id = alimentos.id
        WHERE estoque_alimentos.ativo = 1;
    ` 

    const [result] = await db.execute(sql)

    return result
}

async function moverHistorico(quantidade, custo_total, idE, tipo_movimentacao){
    const conexao = await db.getConnection()

    try {
        await conexao.beginTransaction()

        const sql1 = `
            INSERT INTO historico_alimentos (estoque_id, quantidade, custo, tipo_movimentacao)
            SELECT id, ?, ?, ?
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

async function verHistorico(){

    const sql = `
        SELECT * FROM historico_alimentos
    `

    /*const sql = `
        SELECT estoque_alimentos.alimento_id as id_alimento, 
               estoque_alimentos.validade as validade, 
               tipo_movimentacao
        FROM estoque_alimentos
        INNER JOIN historico_alimentos on historico_alimentos.estoque_id = estoque_alimentos.id
        where ativo = 1;;

    `*/

    const [result] = await db.execute(sql)

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