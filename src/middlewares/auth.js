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
            id: decodificado.userId,
            familyId: decodificado.familyId
        }

        return next()
    } catch (error) {
        next(error)
    }
}

function requireFamily(req, res, next){

    if(!req.user || !req.user.familyId){
       return res.status(403).json({
            status: "Error",
            mensagem: "Acesso negado: Você precisa entrar ou criar uma família primeiro."
        });
    }
    return next()
}

module.exports = { authMiddleware, requireFamily }