const { gql } = require("apollo-server-express")

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
        palettes: [ID]!
    }

    type Palette {
        id: ID!
        likes: Int!
        colors: [String!]!
    }

    type Query {
        getAllPalettes: [Palette!]!
        getUserPalettes: [Palette!]!

        loginUser: User!
        logoutUser: User!
    }

    type Mutation {
        createUser(email: String!, password: String!): User!

        createPalette(colors: [String!]!): Palette!
        updatePalette(id: ID!, colors: [String], sign: Int!): Palette!
    }
`

/*
database structure
{
    user: [
        {
            id,
            email,
            password
        }
    ],
    palettes: [
        {
            id: 0
            likes: 0
            colors: []
            author: userId
        }
    ]
}
*/

module.exports = typeDefs