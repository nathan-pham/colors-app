module.exports = (app, config) => {
	app.get("/generate", (req, res) => {
		res.render("generate.html", {
            ...config,
		})
	})
}