const usuarioRepo = require("../repository/userRepository.js")
const bcrypt = require("bcrypt")

async function cadastrarUsuarioService(nome, email, senha){

    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuarioService = await usuarioRepo.cadastrarUsuarioRepo(nome, email, senhaHash)

    return novoUsuarioService

}

module.exports = {
    cadastrarUsuarioService
}