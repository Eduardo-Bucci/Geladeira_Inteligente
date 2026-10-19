const { Router } = require("express")
const controller = require("../controller/userController.js")

const rotaUsuario = Router();

rotaUsuario.post("/cadastro", controller.cadastrarUsuarioController)

rotaUsuario.post("/login", controller.loginUsuarioController)


module.exports = { 
    rotaUsuario 
}