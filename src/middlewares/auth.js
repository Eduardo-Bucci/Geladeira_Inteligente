const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        const erro = new Error("Acesso negado: Token não fornecido")
        erro.codigoStatus = 401
        throw erro
    }

    const token = authHeader.split(" ")[1]

    try {
        
        const decodificado = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {
            id: decodificado.usuario_id,
            familyId: decodificado.familia_id
        }

        return next()
    } catch (error) {
        next(error)
    }
}

function requireFamily(res, res, next){

    if(!req.user || !req.user.familia_id){
        const erro = new Error("Acesso negado: Voce precisa entrar ou criar uma familia primeiro")
        erro.codigoStatus = 403
        throw erro
    }
    return next()
}

module.exports = { authMiddleware, requireFamily }