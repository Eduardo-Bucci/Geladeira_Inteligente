const { z } = require("zod")

const familiaSchema = z.object({
    nome: z.string().max(30, "Nome de usuário pode conter no máximo ate 30 caracteres"),
})

const familiaUsuariosSchema = z.object({
    familia_id: z.coerce.number().int("O id tem que ser inteiro").positive("O id tem que ser positivo"), 
    usuario_id: z.coerce.number().int("O id tem que ser inteiro").positive("O id tem que ser positivo"),
    papel: z.string().max(30, "O papel só pode ter até 30 caracteres")
})

module.exports = {
    familiaSchema,
    familiaUsuariosSchema
}