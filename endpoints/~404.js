module.exports = (app, config) => {
	app.use((req, res) => {
		res.status(404).render("error.html", {
            error: 404
		})
	})
}