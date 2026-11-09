const translate = require('google-translate-api-x');

async function traduzir(termoIngles){
    if(!termoIngles){ return "" }
    try {
        const res = await translate(termoIngles.trim(), {from: "en", to: "pt"})
        
        return res.text ? res.text.toLowerCase().trim() : termoIngles.toLowerCase().trim()
    } catch (error) {
        console.error(`Falha ao traduzir ${termoIngles}, mantendo original.`, error.message);
        return termoIngles.toLowerCase().trim();
    }
}

module.exports = { traduzir }