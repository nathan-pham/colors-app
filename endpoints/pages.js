const { usersDB, authorized, format } = require("../deta")

const fetchUser = async (req) => {
    const { email } = await authorized(req)
    return email ? (await usersDB.fetch({ email })).items[0] : false
}

module.exports = (app, config) => {
	app.get("/", async (req, res) => {
        const user = await fetchUser(req)
        
        res.render("index.html", user
            ? { ...config, user }
            : config
        )
	})

    app.get("/~", async (req, res) => {
        const user = await fetchUser(req)

        user
            ? res.render("dashboard.html", { user })
            : res.redirect("/")
	})

    app.get("/generate", (req, res) => {
		res.render("generate.html")
	})

    app.get("/resources", (req, res) => {
		res.render("resources.html")
    })

    app.get("/generate/:id", (req, res) => {
        console.log(req.params.id)
		res.render("generate.html")
    })

    app.get("/u/:id", (req, res) => {
		res.render("generate.html")
    })
}