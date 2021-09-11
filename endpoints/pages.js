const jwt = require("jsonwebtoken")

module.exports = (app, config) => {
	app.get("/", (req, res) => {
		res.render("index.html", config)
	})

    app.get("/~", async (req, res) => {
        const token = req.cookies.JWT_TOKEN

        token && await jwt.verify(token, process.env.JWT_SECRET)
            ? res.render("dashboard.html", config)
            : res.redirect("/")
	})

    app.get("/generate", (req, res) => {
		res.render("generate.html", config)
	})
}