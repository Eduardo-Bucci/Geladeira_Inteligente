const repository = require("../repository/familiaRepository.js")

async function cadastrarFamiliaService(nome){
    if(!nome){
        throw new Error("Nome da família não infomado")
    }

    const novaFamiliaService = await repository.cadastrarFamilia(nome)

    return novaFamiliaService
}

async function cadastrarUsuarioFamiliaService(familia_id, usuario_id, papel){
    if(!familia_id || !usuario_id || !papel){
        throw new Error("Digite as informações necessárias!")
    }

    if(familia_id === 0){
        throw new Error("Não há nenhuma família cadastrada com esse ID")
    }

    if(usuario_id === 0){
        throw new Error("Não há nenhum usuário cadastrado com esse ID")
    }

    const novoUsuarioFamilia = await repository.cadastrarUsuarioFamilia(familia_id, usuario_id, papel)

    return novoUsuarioFamilia
}

async function listarUsuariosFamiliaService(){
    return await repository.listarUsuariosFamilia()
}


module.exports = {
    cadastrarFamiliaService,
    cadastrarUsuarioFamiliaService,
    listarUsuariosFamiliaService,
}