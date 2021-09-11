module.exports = (app, config) => {
	app.get("/", (req, res) => {
		res.render("index.html", config)
	})

    app.get("/~", (req, res) => {
		res.render("dashboard.html", config)
	})

    app.get("/generate", (req, res) => {
		res.render("generate.html", config)
	})
}