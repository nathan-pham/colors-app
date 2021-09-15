const { gql } = require("apollo-server-express")

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        palettes: [ID]!,
        token: String
    }

    type Palette {
        id: ID!
        author: ID!
        likes: Int!
        colors: [String!]!
    }

    type Query {
        getAllPalettes: [Palette!]!
        getUserPalettes: [Palette!]!

        loginUser(email: String!, password: String!): User!
        logoutUser: String!
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User!
        createPalette(colors: [String!]!): Palette!

        updatePalette(id: ID!, colors: [String]): [String!]!
        likePalette(id: ID!, sign: Int!): Int!
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