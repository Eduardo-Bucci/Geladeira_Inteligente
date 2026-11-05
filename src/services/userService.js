const repository = require("../repository/userRepository.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function cadastrarUsuarioService(nome, email, senha){

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

    const { pivo, usuario_id } = await repository.validacaoToken()
    
    const familia_id = pivo.length > 0 ? pivo[0].familia_id : null

    const token = jwt.sign(
        {
            userId: usuario_id,
            familyId: familia_id
        },

        process.env.JWT_SECRET,
        {expiresIn: "4h"}
    )

    return {
        mensagem: "Login realizado com sucesso!",
        token: token,
        login
    }
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