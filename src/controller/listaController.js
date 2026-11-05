const { no } = require("zod/locales")
const { adicionarItemLista } = require("../repository/listaRepository.js")
const service = require("../services/listaService.js")

async function adicionarUmaListaController(req, res, next){
    try {
        const {familia_id, nome} = req.body

        const novaLista = await service.adicionarUmaListaService(familia_id, nome)

        return res.status(201).json({
            mensagem: "Lista criada com suceso",
            data: novaLista
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
        const { id } = req.params
        const novosDados = req.body

        const atualizar = await service.atualizarListaService(id, novosDados)
        return res.status(200).json({
            mensagem: "Informação alterada com sucesso",
            data: atualizar
        })
    } catch (error) {
        next(error)
    }
}

async function adicionarItemListaController(req, res, next){
    try {
        const {lista_id, alimento_id, quantidade, unidade, comprado} = req.body

        const novoItem = await service.adicionarItemListaService(lista_id, alimento_id, quantidade, unidade, comprado)

        return res.status(201).json({
            mensagem: "Item adicionado a lista com sucesso!",
            data: novoItem
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    adicionarUmaListaController,
    verListaController,
    atualizarListaController,
    adicionarItemListaController
}