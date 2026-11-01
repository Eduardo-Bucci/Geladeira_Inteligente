const controller = require("../controller/dashboardController.js")
const { Router } = require("express")

const rotaDashboard = Router()

rotaDashboard.get("/dashboard", controller.dashboardInfoController)


module.exports = {
    rotaDashboard,
}