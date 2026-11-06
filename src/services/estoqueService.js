const repository = require("../repository/estoqueRepository.js")
const alimentosRepository = require("../repository/alimentoRepository.js")

async function cadastrarEstoqueService(familyId, dados){

    ////////// LÓGICA DA VALIDADE //////////////
    const data = new Date()
    data.setHours(0, 0, 0, 0)

    const dataValidade = new Date(dados.validade)
    dataValidade.setHours(0, 0, 0, 0)

    const diferencaMs = dataValidade - data

    const diferencaDia = diferencaMs / (1000 * 60 * 60 * 24)

    let novoEstado = dados.estado

    if(diferencaDia >= 30){novoEstado = "Longe do vencimento"}
    else if(diferencaDia <= 30 && diferencaDia > 15){novoEstado = "Menos de um mês para vencer"} 
    else if(diferencaDia <= 15 && diferencaDia > 7){novoEstado = "Menos de duas semanas para vencer"}
    else if(diferencaDia <= 7 && diferencaDia > 3){novoEstado = "Menos de uma semana para vencer"}
    else if(diferencaDia <= 3 && diferencaDia >= 0){novoEstado = "Vence em breve"}
    else{novoEstado = "vencido"}

    const dataCerta = dataValidade.toISOString().substring(0, 10)
    /////////////////////////////////////////////

    let resultadoAlimento = await alimentosRepository.buscarAlimentoPorNome(dados.nome_alimento.trim())
    let alimentoId = null

    if(resultadoAlimento){
        alimentoId = resultadoAlimento.id || resultadoAlimento[0]?.id
    }

    else{
        let resultadoCategoria = await alimentosRepository.buscarCategoriaPorNome(dados.nome_categoria.trim())
        let categoriaId = null

        if(resultadoCategoria){
            categoriaId = resultadoCategoria.id || resultadoCategoria[0]?.id
        }
        else{
            const novaCategoriaId = await alimentosRepository.cadastrarCategoriaRepo(dados.nome_categoria.trim())
            categoriaId = novaCategoriaId.id || novaCategoriaId
        }

        const novoAlimento = {
            categoria_id: categoriaId,
            nome: dados.nome_alimento.trim(),
            unidade_padrao: dados.unidade_padrao || "un"
        }

        const retornoNovoAlimento = await alimentosRepository.cadastrarAlimentoRepo(novoAlimento)
        alimentoId = retornoNovoAlimento.id 
    }
    
    const itemEstoque = {
        familyId: familyId,
        alimento_id: alimentoId,
        quantidade: dados.quantidade,
        dataCerta: dataCerta,
        custo_total: dados.custo_total,
        novoEstado: novoEstado 
    }

    console.log( itemEstoque )

    const novoEstoqueService = await repository.cadastrarEstoque(itemEstoque)

    return novoEstoqueService
}

async function verEstoqueService(familyId){


    return await repository.verEstoque(familyId)
}

async function excluirItemEstoqueService(id){
    const resultado = await repository.excluirItemEstoque(id)

    if(id === 0){
        throw new Error("Alimento não encontrado")
    }

    return resultado
}

async function moverHistoricoService(quantidade, custo_total, idE, tipo_movimentacao){
    if(!quantidade || !custo_total || !idE || !tipo_movimentacao){
        throw new Error("Digite todas as colunas antes de prosseguir", codigoStatus = 404)
    }

    const moverHistoricoService = await repository.moverHistorico(quantidade, custo_total, idE, tipo_movimentacao)

    return moverHistoricoService
}

async function verHistoricoService(familyId){
    return await repository.verHistorico(familyId)
}


module.exports = {
    cadastrarEstoqueService,
    verEstoqueService,
    moverHistoricoService,
    verHistoricoService,
    excluirItemEstoqueService
}