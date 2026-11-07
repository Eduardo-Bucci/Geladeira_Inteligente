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

async function atualizarListaService(id, novosDados){

    const itemExiste = await repository.existe(id)

    if(!itemExiste){
        const erro = new Error("O item não existe!")
        erro.codigoStatus = 404
        throw erro
    }

    const itemAtualizado = await repository.update(id, novosDados)

    return {data: itemAtualizado}
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