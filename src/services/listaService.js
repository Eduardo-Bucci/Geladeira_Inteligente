const repository = require("../repository/listaRepository.js")

async function adicionarListaService(){
    
    const novoItemListaService = await repository.adicionarLista()

    return novoItemListaService
}

async function verListaService(){
    const lista = await repository.verLista()

    return listaService
}

async function atualizarListaService(){
    const atualizar = await repository.atualizarLista()

    return atualizarService
}


module.exports = {
    adicionarListaService,
    verListaService,
    atualizarListaService
}