const repository = require("../repository/dashboardRepository.js")

async function dashboardInfoService(familyId){

    const {totalCadastrado, venceBreve} = await repository.dashboardInfo(familyId)

    return {totalCadastrado, venceBreve}
    
}


module.exports = {
    dashboardInfoService
}