const repository = require("../repository/familiaRepository.js")

async function cadastrarFamiliaService(nome){

    const novaFamiliaService = await repository.cadastrarFamilia(nome)

    return novaFamiliaService
}

async function cadastrarUsuarioFamiliaService(familia_id, usuario_id, papel){

    if(familia_id === 0){
        throw new Error("Não há nenhuma família cadastrada com esse ID")
    }

    if(usuario_id === 0){
        throw new Error("Não há nenhum usuário cadastrado com esse ID")
    }

    const novoUsuarioFamilia = await repository.cadastrarUsuarioFamilia(familia_id, usuario_id, papel)

    return novoUsuarioFamilia
}

async function listarUsuariosFamiliaService(familyId){
    return await repository.listarUsuariosFamilia(familyId)
}


module.exports = {
    cadastrarFamiliaService,
    cadastrarUsuarioFamiliaService,
    listarUsuariosFamiliaService,
}