const { usersDB, authorized, format } = require("../deta")

const fetchUser = async (req) => {
    const { email } = await authorized(req)
    return email ? (await usersDB.fetch({ email })).items[0] : null
}

module.exports = (app, config) => {
    const restrict = (_template, type, next=() => ({})) => async (req, res) => {
        const template = _template + ".html"
        const user = await fetchUser(req)
        
        const result = {
            user,
            ...config,
            ...next(req, res)
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

	app.get("/", restrict("index"))

    app.get("/~", restrict("dashboard", "force"))

    app.get("/generate", restrict("generate"))

    app.get("/generate/:id", restrict("generate", "loose", (req, res) => {
        console.log(req.params.id)
        return {}
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