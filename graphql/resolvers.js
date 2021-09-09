module.exports = {
    Query: {
        hello: () => "Hello World",
        getAllPalettes: () => {
            return [
                {
                    id: 1,
                    likes: 0,
                    colors: ["#000"]
                }
            ]
        }
    },

    Mutation: {
        createUser: (_, args) => {
            return {
                email: args.email,
                password: args.password,
                palettes: [
                    {
                        id: 1,
                        likes: 0,
                        colors: ["#000"]
                    }
                ]
            }
        },
        
        createPalette: (_, args) => {
            return args
        },

        updatePalette: (_, args) => {
            
        }
    }
}

/*
writing mutations

mutation Mutation {
  createUser(email: "Nathan", password: "ok") {
    email,
    palettes {
      likes,
      colors
    }
  }
}
*/

/*
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
    }

    type Mutation {
        createUser(name: String!, password: String!): User!
        createPalette(colors: [String!]!)
        updatePalette(id: ID!)
    }
 */