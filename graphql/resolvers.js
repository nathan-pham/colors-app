const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { usersDB, palettesDB, fetchUser, authorized, format } = require("../deta")

module.exports = {
    Query: {
        getAllPalettes: async () => (
            ((await palettesDB.fetch()).items || []).map(format)
        ),

        loginUser: async (_, { email, password }, { res }) => {
            const user = (await usersDB.fetch({ email })).items[0]
            const success = (user && await bcrypt.compare(password, user.password))

            const expiresIn = new Date().getTime() * 60 * 60 * 1000
            const token = jwt.sign(
                { email }, process.env.JWT_SECRET, 
                { algorithm: "HS512", expiresIn }
            )

            res.cookie("JWT_TOKEN", token, {
                httpOnly: true, 
                secure: true
            })

            if(success) {
                return format({
                    ...user,
                    token
                })
            } else {
                return new Error("That email or password does not match our records.")
            }
        },

        logoutUser: (_, args, { res }) => {
            const invalidToken = req.cookies.JWT_SECRET
            res.clearCookie("JWT_TOKEN")
            return invalidToken
        }
    },

    Mutation: {
        createUser: async (_, { name, email, password }) => {
            const exists = (await usersDB.fetch({ email })).items.length > 0

            if(exists) {
                return new Error("A user with a similar email already exists.")
            }

            return name && email && password
                ? (
                    format(await usersDB.put({ 
                        name,
                        email, 
                        password: await bcrypt.hash(password, 10),
                        palettes: []
                    }))
                )
                : new Error("Missing a required field")
        },

        createPalette: async (_, { colors=[] }, { req }) => {
            const user = await fetchUser(req)

            if(user) {
                const palette = await palettesDB.put({ likes: 0, colors, author: user.key })
                await usersDB.update({ palettes: user.palettes.concat(palette.key) }, user.key)
                return format(palette)
            } else {
                return new Error("You are not authorized to perform this action")
            }
        },

        updatePalette: async (_, { id, colors }, { req }) => {
            const user = await fetchUser(req)

            if(user && user.palettes.includes(id)) {
                await palettesDB.update({ colors }, id)
                return colors
            } else {
                return new Error("You are not authorized to perform this action")
            }
        },

        incrementFork: async (_, { id }, { req }) => {
            const user = await fetchUser(req)
            
            if(user) {
                if(!user.palettes.includes(id)) {
                    await palettesDB.update({ likes: palettesDB.util.increment() }, id)
                }

                return id
            } else {
                // TODO: make custom errors
                throw new Error("You are not authorized to perform this action")
            }
            // Math.sign(sign)
        },

        deletePalette: async (_, { id }, { req }) => {
            const user = await fetchUser(req)

            if(user && user.palettes.includes(id)) {
                await palettesDB.delete(id)
                await usersDB.update({ palettes: user.palettes.filter(p => p !== id) }, user.key)
                
                return id
            } else {
                return new Error("You are not authorized to perform this action")
            }
        }
    }
}