const { Router } = require("express")
const controller = require("../controller/familiaController.js")
const { validate } = require("../middlewares/validator.js")
const { familiaSchema, familiaUsuariosSchema } = require("../schemas/familiaSchema.js")

const rotaFamilia = Router()

rotaFamilia.post("/cadastroFamilias", validate(familiaSchema), controller.cadastrarFamiliaController)

rotaFamilia.post("/cadastroUsuarioFamilia", validate(familiaUsuariosSchema), controller.cadastrarUsuarioFamiliaController)

rotaFamilia.get("/usuariosFamilia", controller.listarUsuariosFamiliaController)

module.exports = {
    rotaFamilia
}