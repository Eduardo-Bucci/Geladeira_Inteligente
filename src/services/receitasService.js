const repository = require("../repository/receitasRepository.js")
const alimentoRepository = require("../repository/alimentoRepository.js")
const { traduzir } = require("../utils/tradutor.js");

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function importarReceitasRecipe(){
    try {
    const response = await fetch("https://recipeapi.io/api/v1/recipes?per_page=5&cuisine=german",
    {headers: {"Authorization": `Bearer ${process.env.RECIPEAPI_KEY}`}}
    );

    const respostaApi = await response.json();

    if (!respostaApi.data || respostaApi.data.length === 0) {
        return { status: "Success", mensagem: "Nenhuma receita encontrada na API externa." };
    }

    for(const receitaCru of respostaApi.data){

        console.log(`-> Traduzindo receita: ${receitaCru.name}`);

        await esperar(1500)
        const nomePt = await traduzir(receitaCru.name)

        await esperar(1500);
        const descricaoPt = await traduzir(receitaCru.description)

        await esperar(1500);
        const instrucoesPt = await traduzir(receitaCru.instructions.join("\n"))

        await esperar(1500);
        const tipo_refeicaoPt = await traduzir(receitaCru.meal_type)

        const dadosReceita = {
            nome: nomePt,
            descricao: descricaoPt,
            dificuldade: receitaCru.difficulty,
            tipo_refeicao: tipo_refeicaoPt,
            instrucoes: instrucoesPt
        }

        const novaReceitaId = await repository.salvarReceita(dadosReceita)

        for(const ingredienteCru of receitaCru.ingredients){    

            await esperar(1500);
            const nomeIngredientePt = await traduzir(ingredienteCru.name || ingredienteCru)
            const nomeIngrediente = nomeIngredientePt.toLowerCase().trim()

            let alimento = await alimentoRepository.buscarAlimentoPorNome(nomeIngrediente)
            let alimentoIdReal = null

            if (alimento) {
                
                alimentoIdReal = alimento.id || alimento[0]?.id || alimento;
            } else{
                const novoAlimento = await alimentoRepository.cadastrarAlimentoRepo({
                    categoria_id: 120001,
                    nome: nomeIngrediente,
                    unidade_padrao: ingredienteCru.unit || "un"
                })
                alimentoIdReal = novoAlimento.id || novoAlimento
        }

            await repository.vincularIngrediente(novaReceitaId, alimentoIdReal)

        }
    }
    return { status: "Success", mensagem: "Todas as receitas foram salvas no banco com sucesso"}
    } catch (error) {
        console.error("Falha fatal na sincronização:", error.message);
        throw error;
    }
}

async function verReceitas(familyId){
    return await repository.buscarReceitasCompativeis(familyId)
}

module.exports = {
    importarReceitasRecipe,
    verReceitas
}