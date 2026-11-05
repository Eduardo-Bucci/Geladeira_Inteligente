const { z } = require("zod")

const categoriaSchema = z.object({
    nome: z.string().max(50, "A categoria não pode ter mais de 50 caracteres")
})

const alimentoSchema = z.object({
   categoria_id: z.coerce.number().int("O id tem que ser um número inteiro").positive("O id tem que ser positivo"),
   nome: z.string().max(30, "O alimento não pode ter mais de 30 caracteres"), 
   unidade_padrao: z.string().max(10, "A unidade não pode conter mais de 10 caracteres")
})


module.exports = {
    categoriaSchema,
    alimentoSchema
}