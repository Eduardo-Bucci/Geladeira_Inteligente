const repository = require("../repository/alimentoRepository.js")

async function cadastrarCategoriaService(nome){

    if(!nome){
        return codigoStatus = 400, mensagem = "Preencha a lacuna"
    }

    const novaCategoriaService = await repository.cadastrarCategoriaRepo(nome)

    return novaCategoriaService
}


async function listarCategoriasService(){
    return await repository.listarCategoriaRepo()
}

async function excluirCategoriaS(id){
    const resultado = await repository.excluirCategoria(id)

    if(resultado === 0){
        throw new Error("Categoria não encontrada")
    }

    return resultado
}


async function cadastrarAlimentoService(categoria_id, nome, unidade_padrao){

    if(!categoria_id || !nome || !unidade_padrao){
        return codigoStatus = 400, mensagem = "Preencha todas as lacunas"
    }

    const novoAlimentoService = await repository.cadastrarAlimentoRepo(categoria_id, nome, unidade_padrao)

    return novoAlimentoService
}


async function listarAlimentosService(){
    return await repository.listarAlimentosRepo()
}


async function excluirAlimentoS(id){
    const resultado = await repository.excluirAlimento(id)

    if(resultado === 0 ){
        throw new Error("Alimento não encontrado")
    }

    return resultado
}

module.exports = {
    cadastrarCategoriaService,
    cadastrarAlimentoService,
    listarCategoriasService,
    listarAlimentosService,
    excluirCategoriaS,
    excluirAlimentoS
}