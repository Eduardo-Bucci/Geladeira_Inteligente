const { z } = require("zod")

const estoqueSchema = z.object({
    nome_alimento: z.string().max(30, "O nome do alimento não pode ter mais de 30 caracteres"),
    nome_categoria: z.string().max(30, "A categoria pode não pode ter mais de 30 caracteres").optional(),
    quantidade: z.coerce.number().positive("A quantidade deverá ser positiva e maior que zero"),
    validade: z.coerce.date("Envie um formato de data válido"),
    custo_total: z.coerce.number().positive("O custo não pode ser negativo")
})

module.exports = {
    estoqueSchema
}