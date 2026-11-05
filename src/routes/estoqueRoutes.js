const { Router } = require("express")
const controller = require("../controller/estoqueController.js")
const { validate } = require("../middlewares/validator.js")
const { estoqueSchema } = require("../schemas/estoqueSchema.js")

const rotaEstoque = Router()

rotaEstoque.post("/cadastroEstoque", validate(estoqueSchema), controller.cadastrarEstoqueController)

rotaEstoque.get("/estoque", controller.verEstoqueController)

rotaEstoque.delete("/estoque/:id", controller.excluirItemEstoqueController)

rotaEstoque.post("/moverHistorico", controller.moverHistoricoController)

rotaEstoque.get("/historico", controller.verHistoricoController)


module.exports = {
    rotaEstoque,
}