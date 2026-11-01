const controller = require("../controller/listaController.js")
const { Router } = require("express")

const rotaLista = Router()

rotaLista.post("/adicionarItem", controller.adicionarListaController)

rotaLista.get("/lista", controller.verListaController)

rotaLista.patch("/lista/:id", controller.atualizarListaController)

module.exports = {
    rotaLista
}