require("dotenv").config()
const express = require("express");
const cors = require("cors");

const { rotaUsuario } = require("./routes/userRoutes.js")
const { rotaAlimento } = require("./routes/alimentoRoutes.js");
const { rotaFamilia } = require("./routes/familiaRoutes.js")
const { rotaEstoque } = require("./routes/estoqueRoutes.js");

const { errorHandler } = require("./middlewares/gestorDeErro.js");


const app = express();
const PORT = 3001 || process.env.PORT

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json({
        mensagem:"Não era para voce estar aqui..."
    })
})

app.use(rotaUsuario)
app.use(rotaAlimento)
app.use(rotaFamilia)
app.use(rotaEstoque)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
})