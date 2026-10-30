const service = require("../services/estoqueService.js")

async function cadastrarEstoqueController(req, res, next){
    try {
        const {familia_id, alimento_id, quantidade, validade, custo_total, estado} = req.body

        const novoEstoque = await service.cadastrarEstoqueService(familia_id, alimento_id, quantidade, validade, custo_total, estado)

        return res.status(201).json({
            mensagem: "Novo lote cadastrado com sucesso!",
            data: novoEstoque
        })
    } catch (error) {
        next(error)
    }
}

async function verEstoqueController(req, res, next){
    try {
        const estoque = await service.verEstoqueService()
        return res.status(200).json(estoque)
    } catch (error) {
        next(error)
    }
}

async function moverHistoricoController(req, res, next){
    try {
        const {estoque_id, tipo_movimentacao, quantidade} = req.body

        const movido = await service.moverHistoricoService(estoque_id, tipo_movimentacao, quantidade)

        return res.status(200).json({
            mensagem: "Movimentação concluída",
            data: movido
        })
    } catch (error) {
        next(error)
    }
}

async function verHistoricoController(req, res, next){
    try {
        const historico = await service.verHistoricoService()
        return res.status(200).json(historico)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    cadastrarEstoqueController,
    verEstoqueController,
    moverHistoricoController,
    verHistoricoController,
}