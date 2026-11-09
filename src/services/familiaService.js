const repository = require("../repository/familiaRepository.js")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function cadastrarFamiliaService(userId, nome) {

    if (!userId) {
        const erro = new Error(
            "Não foi possível identificar o usuário logado. Faça login novamente."
        );
        erro.codigoStatus = 401;
        throw erro;
    }

    const codigo_convite = crypto.randomBytes(3)
        .toString("hex")
        .toUpperCase();

    // Cria a família
    const novaFamiliaService = await repository.cadastrarFamilia(
        nome,
        codigo_convite
    );

    // Vincula o usuário como dono
    await repository.cadastrarUsuarioFamilia(
        novaFamiliaService.id,
        userId,
        "Dono"
    );

    // Gera um novo token com o familyId
    const novoToken = jwt.sign(
        {
            userId: userId,
            familyId: novaFamiliaService.id
        },
        process.env.JWT_SECRET,
        { expiresIn: "4h" }
    );

    return {
        familia: novaFamiliaService,
        codigo_convite,
        token: novoToken
    };
}

async function listarUsuariosFamiliaService(familyId){
    return await repository.listarUsuariosFamilia(familyId)
}


module.exports = {
    cadastrarFamiliaService,
    aceitarConvite,
    listarUsuariosFamiliaService,
}