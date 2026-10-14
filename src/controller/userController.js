const { cadastrarUsuarioService } = require("../services/userService.js")

async function cadastrarUsuarioController(req, res, next){

    try {
        const {nome, email, senha} = req.body;

        const novoUsuario = await cadastrarUsuarioService(nome, email, senha)

        return res.status(201).json({
            mensagem: "Tudo nos conformes!",
            data: novoUsuario
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário" + error
        })
        
    }

}

module.exports = {
    cadastrarUsuarioController
}
