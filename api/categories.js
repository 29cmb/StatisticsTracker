const db = require("../modules/db")

module.exports = {
    method: "get",
    route: "/api/v1/categories",
    middleware: [],
    controller: async (req, res) => {
        const categories = await db.collections.categories.find({}).toArray()
        res.json({success: true, categories})
    }
}