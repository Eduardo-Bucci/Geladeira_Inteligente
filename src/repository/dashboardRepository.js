const db = require("../config/database.js")

async function dashboardInfo(){
    const sql = `
        SELECT COUNT(*) as total FROM estoque_alimentos WHERE ativo = 1;
        SELECT COUNT(*) as totalVence FROM estoque_alimentos WHERE estado = ? AND ativo = 1;
    `

    const [results] = await db.query(sql, ["Vence em breve"]) 

    const totalCadastrado = results[0][0].total
    const venceBreve = results[1][0].totalVence

    return{ totalCadastrado, venceBreve }
}


module.exports = {
    dashboardInfo,
}