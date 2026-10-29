const repository = require("../repository/userRepository.js")
const bcrypt = require("bcrypt")

async function cadastrarUsuarioService(nome, email, senha){

    if(!nome || !email || !senha){
        return codigoStatus = 400, mensagem = "Preencha todas os dados"
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuarioService = await repository.cadastrarUsuarioRepo(nome, email, senhaHash)

    return novoUsuarioService
}



async function LoginUsuarioService(email, senha){

    const login = await repository.LoginRepo(email)

    if(!login){
        throw new Error("Email não encontrado")
    }

    const verifySenha = await bcrypt.compare(senha, login.senha)

    if(!verifySenha){
        throw new Error("Senha inválida")
    }

    return login
}



async function listarUsuariosService() {
  return await repository.listarUsuariosRepo();
}



async function excluirUsuarioService(id) {
  const resultado = await repository.excluirUsuarioRepo(id);

  if (resultado === 0) {
    throw new Error("Usuário não encontrado");
  }

  return resultado;
}



module.exports = {
    cadastrarUsuarioService,
    LoginUsuarioService,
    listarUsuariosService,
    excluirUsuarioService
}