const { fetchUser, fetchPalette, palettesDB } = require("../deta")

module.exports = (app, config) => {
    const restrict = (_template, type, _next=() => ({})) => async (req, res) => {
        const template = _template + ".html"
        const user = await fetchUser(req)
        
        const next = await _next(req, res)

        if(next) {
            const result = {
                user,
                ...config,
                ...next
            }

            switch(type) {
                case "force":
                    user
                        ? res.render(template, result)
                        : res.redirect("/")
                    break
                    
                case "loose":
                default:
                    res.render(template, result)
            }
        }
    }

	app.get("/", restrict("index", "loose", async (req, res) => {
        return {
            palettes: ((await palettesDB.fetch()).items || [])
        }
    }))

    app.get("/~", restrict("dashboard", "force"))

    app.get("/generate", restrict("generate"))

    app.get("/generate/:id", restrict("generate", "loose", async (req, res) => {
        const palette = await fetchPalette(req)

        if(palette) {
            return { palette }
        } else {
            res.status(404).render("error.html", { error: 404 })
        }
    }))

    app.get("/resources", restrict("resources"))

    app.get("/u/:id",  restrict("user", "loose", (req, res) => {
        
        return {
            id: req.params.id
        }

            // return email ? (await usersDB.fetch({ email })).items[0] : null

    }))

    // app.get("/u/:id", async (req, res) => {
    //     //         const user = await fetchUser(req)
        
    //     // res.render("index.html", user
    //     //     ? { ...config, user }
    //     //     : config
    //     // )
	// 	res.render("generate.html")
    // })
}