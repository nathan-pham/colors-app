const { gql } = require("apollo-server-express")

const typeDefs = gql`
    type User {
        email: String!
        password: String!
        palettes: [Palette!]!
    }

    type Palette {
        id: ID!
        likes: Int!
        colors: [String!]!
    }

    type Query {
        hello: String!
        getAllPalettes: [Palette!]!
    }

    type Mutation {
        createUser(email: String!, password: String!): User!
        createPalette(colors: [String!]!): Palette!
        updatePalette(id: ID!): Palette!
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

methods: allPalettes
         allUserPalettes
         
         createUser
         loginUser
         logoutUser

         createPalette
         updatePalette

         
*/

module.exports = typeDefs