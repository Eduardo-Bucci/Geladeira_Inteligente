const { Router } = require("express")
const { cadastrarUsuarioController } = require("../controller/userController.js")

const rotaUsuario = Router();

rotaUsuario.post("/cadastro", cadastrarUsuarioController)
module.exports = { 
    rotaUsuario 
}