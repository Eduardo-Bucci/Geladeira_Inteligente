const { z } = require("zod")

const estoqueSchema = z.object({
    familia_id: z.coerce.number().int("O id tem que ser um número inteiro").positive("O id tem que ser positivo"),
    alimento_id: z.coerce.number().int("O id tem que ser inteiro").positive("O id tem que ser positivo"),
    quantidade: z.coerce.number().positive("A quantidade deverá ser positiva e maior que zero"),
    validade: z.coerce.date("Envie um formato de data válido"),
    custo_total: z.coerce.number().positive("O custo não pode ser negativo")
})

module.exports = {
    estoqueSchema
}