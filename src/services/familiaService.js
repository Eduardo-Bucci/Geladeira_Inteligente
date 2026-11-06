const repository = require("../repository/familiaRepository.js")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function cadastrarFamiliaService(userId, nome){

    const codigo_convite = crypto.randomBytes(3).toString("hex").toUpperCase()

    const novaFamiliaService = await repository.cadastrarFamilia(nome, codigo_convite)
    
    console.log(userId, nome, novaFamiliaService.id, codigo_convite)

    await repository.cadastrarUsuarioFamilia(userId, novaFamiliaService.id, "Dono")

    return {familia: novaFamiliaService, codigo_convite}
}

async function aceitarConvite(userId, codigo_convite){

    const familia = await repository.buscarPorCodigo(codigo_convite)
    
    if(!familia){
        const erro = new Error("Código de convite inválido ou expirado.");
        erro.codigoStatus = 404;
        throw erro;
    }

    const jaPertence = await repository.vereficarMembro(userId, familia.id)

    if(jaPertence){
        const erro = new Error("Você já faz parte desta família.");
        erro.codigoStatus = 400;
        throw erro;
    }

    const novoUsuarioFamilia = await repository.cadastrarUsuarioFamilia(familia.id, userId, "Membro")

    const novoToken = jwt.sign(
        {
            userId: userId,
            familyId: familia.id
        },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }

    )

    return {novoUsuarioFamilia, token: novoToken}
}

async function listarUsuariosFamiliaService(familyId){
    return await repository.listarUsuariosFamilia(familyId)
}


module.exports = {
    cadastrarFamiliaService,
    aceitarConvite,
    listarUsuariosFamiliaService,
}