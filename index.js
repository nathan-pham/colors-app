const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const path = require("path")

const resolvers = require("./graphql/resolvers")
const typeDefs = require("./graphql/schema")
const endpoints = require("./endpoints")
const config = require("./app.config")

const app = express()

app.engine("html", require("ejs").renderFile)
app.set("views", path.join(__dirname, "templates"))
app.set("view engine", "html")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const main = (async () => {
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: ({ req }) => {
            
            return { req }
        }

        // https://www.apollographql.com/docs/apollo-server/security/authentication/
    })
    
    await server.start()
    server.applyMiddleware({ app })

    for(const endpoint of endpoints) {
        endpoint(app, config)
    }

    app.listen(config.port, () => {
        console.log("server started on port", config.port)
    })
})()