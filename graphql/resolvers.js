const { Deta } = require("deta")
const bcrypt = require("bcrypt")

const deta = Deta(process.env.DETA_PROJECT_KEY)

const usersDB = deta.Base("users")
const palettesDB = deta.Base("palettes")

const format = (obj) => ({
    ...obj,
    key: null,
    id: obj.key
})

module.exports = {
    Query: {
        getAllPalettes: () => {},
        
        getUserPalettes: () => {},

        loginUser: () => {},

        logoutUser: () => {}
    },

    Mutation: {
        createUser: async (_, { name, email, password }) => (
            name && email && password
                ? (
                    format(await usersDB.put({ 
                        name,
                        email, 
                        password: await bcrypt.hash(password, 10),
                        palettes: []
                    }))
                )
                : new Error("missing a required field")
        ),

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