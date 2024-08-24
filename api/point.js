const db = require("../modules/db.js")
module.exports = {
    method: "post",
    route: "/api/v1/point",
    middleware: [],
    controller: async (req, res) => {
        const { name, value, category } = req.body
        if(name === undefined || value === undefined || typeof name !== "string" || typeof value !== "string") return res.status(500).json({ success: false, message: "Name or Value not provided or not formatted properly"})
        const categoryTable = await db.collections.categories.findOne({ name: category })
        if(categoryTable === undefined) return res.status(500).json({ success: false, message: `Category '${category}' does not exist` })
        await db.collections.data.insertOne({ name, value, category, time: Date.now() })
    }
}