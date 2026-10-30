const db = require("../config/database.js")

async function dashboardInfo(){
    const sql = `
        SELECT * FROM estoque_alimentos;
        SELECT * FROM estoque_alimentos WHERE estado = "Vence em breve"
    `

    const [results] = await db.query(sql) 

    return {
        quantidadeCadastrado: results[0][0].quantidadeCadastrado,
        venceEmBreve: results[1][0].venceEmBreve
    }
}


module.exports = {
    dashboardInfo,
}