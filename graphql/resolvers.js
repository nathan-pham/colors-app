const { Deta } = require("deta")

const deta = Deta(process.env.DETA_PROJECT_KEY)
const palettesDB = deta.Base("palettes")
const usersDB = deta.Base("users")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const format = (obj) => ({
    ...obj,
    key: null,
    id: obj.key
})

module.exports = {
    Query: {
        getAllPalettes: () => {},
        
        getUserPalettes: () => {},

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

        logoutUser: () => {}
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

        createPalette: async (_, { colors }) => {
            format(await palettesDB.put({ likes: 0, colors: [] }))
        },

        updatePalette: (_, { id, colors, sign=0 }) => {
            // Math.sign(sign)
        }
    }
}

/*
    type Query {
        getAllPalettes: [Palette!]!
        getUserPalettes(id: ID!): [Palette!]!

        loginUser: User!
        logoutUser: User!
    }

    type Mutation {
        createUser(email: String!, password: String!): User!

        createPalette(colors: [String!]!): Palette!
        updatePalette(id: ID!): Palette!
    }
*/