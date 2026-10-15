const service = require("../services/userService.js")

async function cadastrarUsuarioController(req, res, next){

    try {
        const {nome, email, senha} = req.body;

        const novoUsuario = await service.cadastrarUsuarioService(nome, email, senha)

        return res.status(201).json({
            mensagem: "Tudo nos conformes!",
            data: novoUsuario
        })

    } catch (error) {
        next(error)
        console.error(error)
        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário" + error
        })
        
    }

}

async function loginUsuarioController(req, res, next){
    
    try {
        const {email, senha} = req.body

        const loginController = await service.LoginUsuarioService(email, senha)

        return res.status(201).json({
            mensagem: "Bem vindo de volta" + email,
        })

    } catch (error) {
        next(error)
        console.error(error)
    }

}

module.exports = {
    cadastrarUsuarioController,
    loginUsuarioController
}
