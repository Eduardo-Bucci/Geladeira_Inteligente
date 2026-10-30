const repository = require("../repository/dashboardRepository.js")

async function dashboardInfoService(){

    const dashboard = await repository.dashboardInfo()

    dashboard.quantidadeCadastrado
    
}