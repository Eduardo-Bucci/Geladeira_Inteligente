const service = require("../services/familiaService.js")

async function cadastrarFamiliaController(req, res, next){
    try {
        const {nome} = req.body

        const novaFamilia = await service.cadastrarFamiliaService(nome)

        return res.status(201).json({
            mensagem: "Família criada com sucesso!",
            data: novaFamilia
        })
        
    } catch (error) {
        next(error)
    }
}

async function cadastrarUsuarioFamiliaController(req, res, next){
    try {
        const {familia_id, usuario_id, papel} = req.body

        const novoUsuarioFamilia = await service.cadastrarUsuarioFamiliaService(familia_id, usuario_id, papel)

        return res.status(201).json({
            mensagem:"Relação usuário-família estabelecida com sucesso!",
            data: novoUsuarioFamilia
        })

    } catch (error) {
        next(error)
    }
}

async function listarUsuariosFamiliaController(req, res, next){
    try {
        const UsuariosFamilia = await service.listarUsuariosFamiliaService()
        return res.status(200).json(UsuariosFamilia)
    } catch (error) {
        next(error)
    }

}

module.exports = {
    cadastrarFamiliaController,
    cadastrarUsuarioFamiliaController,
    listarUsuariosFamiliaController,
}