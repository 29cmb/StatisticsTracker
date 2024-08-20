const express = require("express")
const app = express()

app.use(express.json())

const fs = require("fs")
const path = require("path")

const apiPath = path.join(__dirname, "api")
const apiFiles = fs.readdirSync(apiPath).filter(file => file.endsWith('.js'))

for (const file of apiFiles) {
    const filePath = path.join(apiPath, file)
    const data = require(filePath)(app)
    if(logging.logRouteSetup){
        if(data?.method && data.route){
            console.log(`✅ | API route ${data.method} '${data.route}' has been setup successfully!`)
        } else {
            console.log(`❌ | API route '${filePath}' did not return data.method or did not return data.route.`)
        }
    }
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`✅ | Backend express server has started on port ${process.env.PORT || 3000}.`)
})