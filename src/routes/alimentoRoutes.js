const { Router } = require("express")
const controller = require("../controller/alimentoController.js")
const { validate } = require("../middlewares/validator.js")
const { categoriaSchema, alimentoSchema } = require("../schemas/alimentoSchema.js")

const rotaAlimento = Router();

rotaAlimento.post("/cadastroAlimentos", validate(alimentoSchema), controller.cadastrarAlimentoController)

rotaAlimento.post("/cadastroCategoria", validate(categoriaSchema), controller.cadastrarCategoriaController)

rotaAlimento.get("/categorias", controller.listarCategoriasController)

rotaAlimento.get("/alimentos", controller.listarAlimentosController)

rotaAlimento.delete("/categorias/:id", controller.excluirCategoriaController)

rotaAlimento.delete("/alimentos/:id", controller.excluirAlimentoController)

module.exports = {
    rotaAlimento
}