const { Router } = require("express")
const controller = require("../controller/familiaController.js")

const rotaFamilia = Router()

rotaFamilia.post("/cadastroFamilias", controller.cadastrarFamiliaController)

rotaFamilia.post("/cadastroUsuarioFamilia", controller.cadastrarUsuarioFamiliaController)

rotaFamilia.get("/usuariosFamilia", controller.listarUsuariosFamiliaController)

module.exports = {
    rotaFamilia
}