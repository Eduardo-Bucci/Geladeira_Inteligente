const repository = require("../repository/userRepository.js")
const bcrypt = require("bcrypt")

async function cadastrarUsuarioService(nome, email, senha){

    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuarioService = await repository.cadastrarUsuarioRepo(nome, email, senhaHash)

    return novoUsuarioService

}

async function LoginUsuarioService(email, senha){

    const login = await repository.LoginRepo(email, senha)

    //Ajeitar essa parte
    /*const usuario = login[0]

    if(usuario.length === 0){   
        const error = new error("Email ou senha não encontrados")
        throw error
    }*/

    return login
}

module.exports = {
    cadastrarUsuarioService,
    LoginUsuarioService
}