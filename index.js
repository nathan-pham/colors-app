const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const path = require("path")

const resolvers = require("./database/graphql/resolvers")
const typeDefs = require("./database/graphql/schema")
const endpoints = require("./endpoints")
const config = require("./app.config")

const app = express()

app.engine("html", require("ejs").renderFile)
app.set("views", path.join(__dirname, "templates"))
app.set("view engine", "html")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

for(const endpoint of endpoints) {
	endpoint(app, config)
}

const main = (async () => {
    const server = new ApolloServer({ typeDefs, resolvers })
    
    await server.start()
    server.applyMiddleware({ app })

    app.listen(config.port, () => {
        console.log("Server started on port", config.port)
    })
})()