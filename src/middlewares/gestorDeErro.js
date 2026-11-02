
function errorHandler(error, req, res, next){

    const codigoStatus = error.codigoStatus || 500
    const mensagem = error.mensagem || error.message || "Erro interno no servidor"

    console.error(`[Erro no Servidor] Status: ${codigoStatus} - ${mensagem}`)

    return res.status(codigoStatus).json({
        status: "Error",
        mensagem: mensagem
    })
}

module.exports = {
    errorHandler
}