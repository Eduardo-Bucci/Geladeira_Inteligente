const { Router } = require("express")
const controller = require("../controller/alimentoController.js")

const rotaAlimento = Router();

rotaAlimento.post("/cadastroAlimentos", controller.cadastrarAlimentoController)

rotaAlimento.post("/cadastroCategoria", controller.cadastrarCategoriaController)

rotaAlimento.get("/categorias", controller.listarCategoriasController)

rotaAlimento.get("/alimentos", controller.listarAlimentosController)

rotaAlimento.delete("/categorias/:id", controller.excluirCategoriaController)

rotaAlimento.delete("/alimentos/:id", controller.excluirAlimentoController)

module.exports = {
    rotaAlimento
}