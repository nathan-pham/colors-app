module.exports = (app, config) => {
	app.get("/", (req, res) => {
		res.render("index.html", {
            ...config,
		})
	})
}