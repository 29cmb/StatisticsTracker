const db = require("../modules/db")

module.exports = {
    method: "get",
    route: "/api/v1/:name/data",
    middleware: [],
    controller: async (req, res) => {
        const { name } = req.params
        const data = await db.collections.data.find({ name }).toArray()
        res.json({success: true, data})
    }
}