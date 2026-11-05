const { z } = require("zod")

const adicionarUmaListaSchema = z.object({
    familia_id: z.coerce.number().int("O id tem que ser um número inteiro").positive("O id tem que ser positivo"),
    nome: z.string().max(30, "O nome pode apenas ter 30 caracteres")
})

const adicionarItemListaSchema = z.object({
    lista_id: z.coerce.number().int("O id tem que ser um número inteiro").positive("O id tem que ser positivo"),
    alimento_id: z.coerce.number().int("O id tem que ser inteiro").positive("O id tem que ser positivo"),
    quantidade: z.coerce.number().int().positive("A quantidade deverá ser positiva e maior que zero"),
    unidade: z.string().max(10, "A unidade escolhida pode ter apenas 10 caracteres"),
    comprado: z.coerce.boolean()
})

module.exports = {
    adicionarUmaListaSchema,
    adicionarItemListaSchema
}