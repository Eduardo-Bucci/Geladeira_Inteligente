const { Router } = require("express")
const controller = require("../controller/receitasController.js")
const { authMiddleware, requireFamily } = require("../middlewares/auth.js")

const rotaReceitas = Router() 

rotaReceitas.post("/receitas/sincronizar", authMiddleware, controller.sincronizarReceitas)

module.exports = {
    rotaReceitas
}