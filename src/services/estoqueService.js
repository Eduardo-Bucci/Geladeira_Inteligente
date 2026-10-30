const repository = require("../repository/estoqueRepository.js")

async function cadastrarEstoqueService(familia_id, alimento_id, quantidade, validade, custo_total, estado){

    if(!familia_id, !alimento_id, !quantidade, !validade, !custo_total){
        throw new Error("Informe todas as colunas antes de cadastrar!")
    }

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

async function moverHistoricoService(estoque_id, tipo_movimentacao, quantidade){
    if(!tipo_movimentacao || !quantidade){
        throw new Error("Digite todas as colunas antes de prosseguir")
    }

    const moverHistoricoService = await repository.moverHistorico(estoque_id, tipo_movimentacao, quantidade)

    return moverHistoricoService
}

async function verHistoricoService(){
    return await repository.verHistorico()
}

module.exports = {
    cadastrarEstoqueService,
    verEstoqueService,
    moverHistoricoService,
    verHistoricoService
}