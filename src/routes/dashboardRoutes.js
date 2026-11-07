const controller = require("../controller/dashboardController.js")
const { Router } = require("express")
const { authMiddleware, requireFamily } = require("../middlewares/auth.js")

const rotaDashboard = Router()

rotaDashboard.get("/dashboard", authMiddleware, requireFamily, controller.dashboardInfoController)


module.exports = {
    rotaDashboard,
}