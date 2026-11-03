const { Router } = require("express")
const controller = require("../controller/estoqueController.js")

const rotaEstoque = Router()

rotaEstoque.post("/cadastroEstoque", controller.cadastrarEstoqueController)

rotaEstoque.get("/estoque", controller.verEstoqueController)

rotaEstoque.delete("/estoque/:id", controller.excluirItemEstoqueController)

rotaEstoque.post("/moverHistorico", controller.moverHistoricoController)

rotaEstoque.get("/historico", controller.verHistoricoController)


module.exports = {
    rotaEstoque,
}