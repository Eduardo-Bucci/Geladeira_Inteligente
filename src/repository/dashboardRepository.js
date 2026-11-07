const db = require("../config/database.js")

async function dashboardInfo(familyId){
    const sql = `
        SELECT COUNT(*) as total FROM estoque_alimentos WHERE ativo = 1 AND familia_id = ?;
        SELECT COUNT(*) as totalVence FROM estoque_alimentos WHERE familia_id = ? AND estado = ? AND ativo = 1;
    `

    const [results] = await db.query(sql, [familyId, familyId, "Vence em breve"]) 

    const totalCadastrado = results[0][0].total
    const venceBreve = results[1][0].totalVence

    return{ totalCadastrado, venceBreve }
}


module.exports = {
    dashboardInfo,
}