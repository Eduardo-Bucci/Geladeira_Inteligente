const service = require("../services/familiaService.js")

async function cadastrarFamiliaController(req, res, next){
    try {
        const {nome} = req.body
        const { id: userId } = req.user

        const novaFamilia = await service.cadastrarFamiliaService(userId, nome)

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
        
        const { id: userId } = req.user
        const {codigo_convite} = req.body
        
        if(!codigo_convite){
            return res.status(400).json({ mensagem: "O código de convite é obrigatório." });
        }

        const novoUsuarioFamilia = await service.aceitarConvite(userId, codigo_convite)

        return res.status(201).json({
            mensagem:"Voce entrou na família com sucesso!",
            data: novoUsuarioFamilia,
            token: novoUsuarioFamilia.token
        })

    } catch (error) {
        next(error)
    }
}

async function listarUsuariosFamiliaController(req, res, next){
    try {
        const { familyId } = req.user
        
        const UsuariosFamilia = await service.listarUsuariosFamiliaService(familyId)
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