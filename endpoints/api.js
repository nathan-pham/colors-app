module.exports = (app, config) => {
    app.get("/api/logout", (req, res) => {
        res.clearCookie("JWT_TOKEN")
        res.redirect("/")
    })
}