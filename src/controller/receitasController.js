const service = require("../services/receitasService.js")

async function listarReceitasEstoque(req, res, next){
    //const {familyId} = req.user

}


async function sincronizarReceitas(req, res, next){
    try {
        const resultadoApi = await service.importarReceitasRecipe()

        return res.status(200).json(resultadoApi)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    sincronizarReceitas
}