const service = require("../services/listaService.js")

async function adicionarListaController(req, res, next){
    try {
        const {} = req.body

        const novoItemLista = await service.adicionarListaService()

        return res.status(201).json({
            mensagem: "Item adicionado com sucesso",
            data: novoItemLista
        })
    } catch (error) {
        next(error)
    }
}

async function verListaController(req, res, next){
    try {
        const lista = await service.verListaService()
        return res.status(200).json(lista)
    } catch (error) {
        next(error)
    }
}

async function atualizarListaController(req, res, next){
    try {
        const atualizar = await service.verListaService()
        return res.status(200).json({
            mensagem: "Informação alterada com sucesso",
            data: atualizar
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    adicionarListaController,
    verListaController,
    atualizarListaController
}