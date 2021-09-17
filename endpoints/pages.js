const { fetchUser, fetchPalette, palettesDB } = require("../deta")

module.exports = (app, config) => {
    const restrict = (_template, type, _next=() => ({})) => async (req, res) => {
        const template = _template + ".html"
        const user = await fetchUser(req)
        
        const next = await _next(req, res) || {}

        const result = {
            user,
            ...config,
            ...next
        }

        if(!res.headersSent) {
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
            palettes: (
                (await palettesDB.fetch()).items || []
            ).sort((a, b) => b.likes - a.likes)
        }
    }))

    app.get("/~", restrict("dashboard", "force", async (req, res) => {
        const user = await fetchUser(req)

        return {
            palettes: (user && user.palettes.length)
                ? (await Promise.all(
                    user.palettes.map(p => fetchPalette(p))
                )).sort((a, b) => b.likes - a.likes)
                : []
        }
    }))

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

    app.get("/u/:id",  restrict("user", "loose", async (req, res) => {
        const user = await fetchUser(req.params.id)

        if(user) {
            user.palettes = (await Promise.all(
                user.palettes.map(p => fetchPalette(p))
            )).sort((a, b) => b.likes - a.likes)

            return { user }
        } else {
            res.status(404).render("error.html", { error: 404 })
        }
    }))
}