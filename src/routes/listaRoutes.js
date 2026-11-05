const controller = require("../controller/listaController.js")
const { Router } = require("express")
const { validate } = require("../middlewares/validator.js")
const { adicionarUmaListaSchema, adicionarItemListaSchema } = require("../schemas/listaSchema.js")

const rotaLista = Router()

rotaLista.post("/criarLista", validate(adicionarUmaListaSchema), controller.adicionarUmaListaController)

rotaLista.get("/lista", controller.verListaController)

rotaLista.patch("/lista/:id", controller.atualizarListaController)

rotaLista.post("/adicionarItem", validate(adicionarItemListaSchema), controller.adicionarItemListaController)


module.exports = {
    rotaLista
}