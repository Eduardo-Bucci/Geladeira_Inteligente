const controller = require("../controller/listaController.js")
const { Router } = require("express")

const rotaLista = Router()

rotaLista.post("/criarLista", controller.adicionarUmaListaController)

rotaLista.get("/lista", controller.verListaController)

rotaLista.patch("/lista/:id", controller.atualizarListaController)

rotaLista.post("/adicionarItem", controller.adicionarItemListaController)


module.exports = {
    rotaLista
}