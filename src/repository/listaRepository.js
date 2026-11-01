const db = require("../config/database.js")

async function adicionarLista(){
    const sql = `
    
    `
/*Falta adicionar o sql, os parametros dele em cada classe, req.body no controller e colocar regras de negocio no service */

    const [result] = await db.execute(sql, [])

    return {id: result.insertId}
}

async function verLista(){
    const sql = `
        SELECT * FROM lista
    `

    const [result] = await db.execute(sql)

    return result
}

async function atualizarLista(){

}

module.exports = {
    adicionarLista, 
    verLista, 
    atualizarLista
}