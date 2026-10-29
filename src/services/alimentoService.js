const repository = require("../repository/alimentoRepository.js")

async function cadastrarCategoriaService(nome){

    if(!nome){
        throw new Error("Digite o nome da categoria para ser cadastrada")
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
        throw new Error("Preencha todas as colunas")
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