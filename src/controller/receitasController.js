const service = require("../services/receitasService.js")

async function sincronizarReceitas(req, res, next){
    try {
        const resultadoApi = await service.importarReceitasRecipe()

        return res.status(200).json(resultadoApi)
    } catch (error) {
        next(error)
    }
}

async function listarReceitasEstoque(req, res, next){
    try {
        const {familyId} = req.user

        const receitas = await service.verReceitas(familyId)
        return res.status(201).json(receitas)
    } catch (error) {
        next(error)
    }
   
}

module.exports = {
    sincronizarReceitas,
    listarReceitasEstoque
}