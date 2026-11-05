const { z } = require("zod")

const userSchema = z.object({
    nome: z.string().max(30, "Nome de usuário pode conter no máximo ate 30 caracteres"),
    email: z.email("Endereço de e-mail inválido"),
    senha: z.string().min(8, "A senha tem que conter no mínimo 8 caracteres")
})

module.exports = {
    userSchema 
}