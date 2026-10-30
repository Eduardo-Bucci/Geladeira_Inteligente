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
    }

}

async function loginUsuarioController(req, res, next){
    
    try {
        const {email, senha} = req.body

        if(!email || !senha){
            return res.status(400).json({
                mensagem : "E-mail e senha são obrigatórios"
            })
        }

        const loginController = await service.LoginUsuarioService(email, senha)

        return res.status(200).json({
            mensagem: "Bem vindo de volta " + email,
        })

    } catch (error) {
        next(error)
    }

}


async function listarUsuariosController(req, res, next) {
  try {
    const usuarios = await service.listarUsuariosService();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("ERRO REAL AO LISTAR:", error);
    return next(error);
  }
}



async function excluirUsuarioController(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    await service.excluirUsuarioService(id);

    return res.status(200).json({
      mensagem: "Usuário excluído com sucesso",
    });
  } catch (error) {
    return next(error);
  }
}




module.exports = {
    cadastrarUsuarioController,
    loginUsuarioController,
    listarUsuariosController,
    excluirUsuarioController
}
