const repository = require("../repository/estoqueRepository.js")

async function cadastrarEstoqueService(familia_id, alimento_id, quantidade, validade, custo_total, estado){

    const data = new Date()

    const dataValidade = new Date(validade)

    const diferencaMs = dataValidade - data

    const diferencaDia = diferencaMs / (1000 * 60 * 60 * 24)

    let novoEstado = estado

    if(diferencaDia >= 30){
        novoEstado = "Longe do vencimento"
    }
    else if(diferencaDia <= 30 && diferencaDia > 15){
        novoEstado = "Menos de um mês para vencer"
    }
    else if(diferencaDia <= 15 && diferencaDia > 7){
        novoEstado = "Menos de duas semanas para vencer"
    }
    else if(diferencaDia <= 7 && diferencaDia > 3){
        novoEstado = "Menos de uma semana para vencer"
    }
    else if(diferencaDia <= 3 && diferencaDia >= 0){
        novoEstado = "Vence em breve"
    }
    else{
        novoEstado = "vencido"
    }

    const dataCerta = dataValidade.toISOString().substring(0, 10)

    const novoEstoqueService = await repository.cadastrarEstoque(familia_id, alimento_id, quantidade, dataCerta, custo_total, novoEstado)

    return novoEstoqueService
}

async function verEstoqueService(){
    return await repository.verEstoque()
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

async function verHistoricoService(){
    return await repository.verHistorico()
}


module.exports = {
    cadastrarEstoqueService,
    verEstoqueService,
    moverHistoricoService,
    verHistoricoService,
    excluirItemEstoqueService
}