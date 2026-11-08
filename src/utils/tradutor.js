
async function traduzir(termoIngles){
    try {
        const urlDoTradutor = "https://libretranslate.de" + "/translate";

        const response = await fetch(urlDoTradutor, {
            method: "POST",
            body: JSON.stringify({
                q: termoIngles.trim(),
                source: "en",
                target: "pt",
                format: "text"
            }),
            headers: { "Content-Type": "application/json" }
        })

        const data = await response.json()

        return data.translatedText ? data.translatedText.toLowerCase().trim() : termoIngles.toLowerCase().trim()
    } catch (error) {
        console.error(`Falha ao traduzir ${termoIngles}, mantendo original.`, error.message);
        return termoIngles.toLowerCase().trim();
    }
}

module.exports = { traduzir }