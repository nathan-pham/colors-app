const jwt = require("jsonwebtoken")

const authorized = (req) => {
    const token = req.cookies.JWT_TOKEN
    return token && await jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = (app, config) => {
	app.get("/", (req, res) => {
		res.render("index.html", config)
	})

    app.get("/~", async (req, res) => {
        authoried(req)
            ? res.render("dashboard.html", config)
            : res.redirect("/")
	})

    app.get("/generate", (req, res) => {
		res.render("generate.html", config)
	})

    app.get("/generate/:id", (req, res) => {
        console.log(req.params.id)
		res.render("generate.html", config)
    })
}