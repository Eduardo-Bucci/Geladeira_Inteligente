const repository = require("../repository/listaRepository.js")

async function adicionarUmaListaService(familia_id, nome){

    if(!familia_id || !nome){
        throw new Error("Informe todos os dados para criar a lista")
    }
    
    const novaListaService = await repository.adicionarUmaLista(familia_id, nome)

    return novaListaService
}

async function verListaService(){
    const listaService = await repository.verLista()

    return listaService
}

async function atualizarListaService(){
    const atualizarService = await repository.atualizarLista()

    return atualizarService
}

async function adicionarItemListaService(lista_id, alimento_id, quantidade, unidade, comprado){
    
    if(!lista_id || !alimento_id || !quantidade || !unidade || comprado === undefined){
        throw new Error("Informe todos os dados para adicionar um item a lista")
    }

    const novoItemListaService = await repository.adicionarItemLista(lista_id, alimento_id, quantidade, unidade, comprado)

    return novoItemListaService
}


module.exports = {
    adicionarUmaListaService,
    verListaService,
    atualizarListaService,
    adicionarItemListaService
}