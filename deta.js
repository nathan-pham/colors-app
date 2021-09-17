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
        : false
}

// format deta response by renaming key -> id
const format = (obj) => ({
    ...obj,
    key: null,
    id: obj.key
})

const fetchUser = async (req) => {
    if(typeof req == "string") {
        return (await usersDB.get(req))
    } else {
        const { email } = await authorized(req)
        return email ? (await usersDB.fetch({ email })).items[0] : null
    }
}

const fetchPalette = async (req) => {
    const key = typeof req == "string" ? req : req.params.id
    return key ? (await palettesDB.get(key)) : null
}

module.exports = {
    palettesDB,
    usersDB,

    fetchUser,
    fetchPalette,
    
    authorized,
    format
}