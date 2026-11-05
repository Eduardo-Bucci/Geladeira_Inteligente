const { Router } = require("express")
const controller = require("../controller/userController.js")
const { validate } = require("../middlewares/validator.js")
const { userSchema } = require("../schemas/userSchema.js")

const rotaUsuario = Router();

rotaUsuario.post("/cadastro", validate(userSchema), controller.cadastrarUsuarioController)

rotaUsuario.post("/login", controller.loginUsuarioController)

rotaUsuario.get("/usuarios", controller.listarUsuariosController);

rotaUsuario.delete("/usuarios/:id", controller.excluirUsuarioController);


module.exports = { 
    rotaUsuario 
}