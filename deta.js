const jwt = require("jsonwebtoken")
const { Deta } = require("deta")

// initialize databases
const deta = Deta(process.env.DETA_PROJECT_KEY)
const palettesDB = deta.Base("palettes")
const usersDB = deta.Base("users")

// protect routes by checking JWT token
const authorized = (req) => {
    const token = req.cookies.JWT_TOKEN

    return token
        ? jwt.verify(token, process.env.JWT_SECRET)
        : {}
}

// format deta response by renaming key -> id
const format = (obj) => ({
    ...obj,
    key: null,
    id: obj.key
})

module.exports = {
    palettesDB,
    usersDB,

    authorized,
    format
}