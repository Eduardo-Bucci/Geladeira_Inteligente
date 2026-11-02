const service = require("../services/alimentoService.js")

async function cadastrarCategoriaController(req, res, next){
    try {
        const {nome} = req.body

        const novaCategoria = await service.cadastrarCategoriaService(nome)

        return res.status(201).json({
            mensagem: "Nova categoria cadastrada com sucesso!",
            data: novaCategoria
        })

    } catch (error) {
        next(error)
    }
}


async function listarCategoriasController(req, res, next){
    try {
        const categorias = await service.listarCategoriasService()
        return res.status(201).json(categorias)
    } catch (error) {
        next(error)
    }
}


async function excluirCategoriaController(req, res, next){
    try {
        const id = Number(req.params.id)

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                mensagem: "O id inserido é inválido"
            })
        }

        await service.excluirCategoriaS(id)

        return res.status(200).json({
            mensagem: "A categoria foi excluida com sucesso!"
        })
    } catch (error) {
        next(error)
    }
    


}

async function cadastrarAlimentoController(req, res, next){
    try {
        const {categoria_id, nome, unidade_padrao} = req.body

        const novoAlimento = await service.cadastrarAlimentoService(categoria_id, nome, unidade_padrao)

        return res.status(201).json({
            mensagem: "Novo alimento cadastrado com êxito!",
            data: novoAlimento
        })

    } catch (error) {
        next(error)
    }
}

async function listarAlimentosController(req, res, next){
    try {
        const alimentos = await service.listarAlimentosService()
        return res.status(201).json(alimentos)
    } catch (error) {
        return next(error)
    }
}

async function excluirAlimentoController(req, res, next){
    try {
        const id = Number(req.params.id)

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                mensagem: "O id inserido não foi encontrado"
            })
        }

        await service.excluirAlimentoS(id)

        return res.status(200).json({
            mensagem: "Alimento excluído com êxito!"
        })
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    cadastrarCategoriaController,
    cadastrarAlimentoController,
    listarCategoriasController,
    listarAlimentosController,
    excluirCategoriaController,
    excluirAlimentoController
}