module.exports = {
    method: "get",
    route: "/api/v1/ping",
    middleware: [],
    controller: (req, res) => {
        res.send("pong")
    }
}