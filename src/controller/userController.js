const { cadastrarUsuarioRepo } = require("../repository/userRepository.js")

async function cadastrarUsuarioController(req, res, next){

    try {
        const {nome, email, senha} = req.body

        const novoUsuario = cadastrarUsuarioRepo({nome, email, senha})

        return res.status(201).json({
            mensagem: "Tudo certo!",
            data: novoUsuario
        })
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário" + error
        })
        
    }

}

module.exports = {
    cadastrarUsuarioController
}
