const service = require("../services/dashboardService.js")

async function dashboardInfoController(req, res, next){
    try {
        const { familyId } = req.user

        const dashboard = await service.dashboardInfoService(familyId)
        return res.status(200).json(dashboard)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    dashboardInfoController,
}