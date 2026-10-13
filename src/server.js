require("dotenv").config()
const express = require("express");
const { rotaUsuario } = require("./routes/userRoutes.js")
const cors = require("cors");

const app = express();
const PORT = 3001 || process.env.PORT

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json({
        mensagem:"API Ligada"
    })
})

app.use(rotaUsuario)

app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
})