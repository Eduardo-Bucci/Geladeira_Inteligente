const { Router } = require("express")
const controller = require("../controller/familiaController.js")
const { validate } = require("../middlewares/validator.js")
const { familiaSchema, familiaUsuariosSchema } = require("../schemas/familiaSchema.js")
const { authMiddleware, requireFamily } = require("../middlewares/auth.js")

const rotaFamilia = Router()

rotaFamilia.post("/cadastroFamilias", authMiddleware, validate(familiaSchema), controller.cadastrarFamiliaController)

rotaFamilia.post("/familias/entrar", authMiddleware, validate(familiaUsuariosSchema), controller.cadastrarUsuarioFamiliaController)

rotaFamilia.get("/usuariosFamilia", authMiddleware, requireFamily, controller.listarUsuariosFamiliaController)

module.exports = {
    rotaFamilia
}