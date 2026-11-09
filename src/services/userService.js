const repository = require("../repository/userRepository.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

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

    const { pivo, usuario_id } = await repository.validacaoToken(login.id)
    
    const familyId = pivo.length > 0 ? pivo[0].familia_id : null

    const token = jwt.sign(
        {
            userId: usuario_id,
            familyId: familyId
        },

        process.env.JWT_SECRET,
        {expiresIn: "4h"}
    )

    return {
        mensagem: "Login realizado com sucesso!",
        usuario: { id: login.id, nome: login.nome, email: login.email, family_Id: familyId },
        token: token
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