module.exports = (app) => {
    app.get('/api/v1/ping', (req, res) => {
        res.send('pong')
    })

    return {
        method: "GET",
        route: "/api/v1/ping"
    }
}