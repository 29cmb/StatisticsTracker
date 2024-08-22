const express = require("express")
const app = express()
const db = require("./modules/db")
const fs = require("fs")
const path = require("path")
require("dotenv").config()
app.use(express.json())

const apiPath = path.join(__dirname, "api")
const apiFiles = fs.readdirSync(apiPath).filter(file => file.endsWith('.js'))

db.init()
for (const file of apiFiles) {
    const filePath = path.join(apiPath, file)
    const data = require(filePath)

    if(data?.method && data?.route && data?.controller) {
        app[data.method](data.route, ...data.middleware, (req, res, ...params) => {
            try {
                data.controller(req, res, ...params)
            } catch(err) {
                console.log(`❌ | An error occurred while trying to execute the API route ${data.method.toUpperCase()} ${data.route}: ${err}`)
                res.status(500).json({success: false, message: "Internal server error."})
            }
        })
        console.log(`✅ | API route ${data.method.toUpperCase()} ${data.route} has been loaded successfully!`)
    } else {
        console.log(`❌ | The API route ${file} is missing "method", "route" or "controller" properties.`)
    }
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`✅ | Backend express server has started on port ${process.env.PORT || 3000}.`)
})