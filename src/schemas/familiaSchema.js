const { z } = require("zod")

const familiaSchema = z.object({
    nome: z.string().max(30, "Nome de usuário pode conter no máximo ate 30 caracteres"),
})

const familiaUsuariosSchema = z.object({
    codigo_convite: z.string().max(6, "O codigo de convite pode ter no máximo 6 digitos")
})

module.exports = {
    familiaSchema,
    familiaUsuariosSchema
}