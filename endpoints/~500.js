module.exports = (app, config) => {
	app.use((req, res) => {
		res.status(500).render("error.html", { error: 500 })
	})
}