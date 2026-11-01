const repository = require("../repository/dashboardRepository.js")

async function dashboardInfoService(){

    const {totalCadastrado, venceBreve} = await repository.dashboardInfo()

    return {totalCadastrado, venceBreve}
    
}


module.exports = {
    dashboardInfoService
}