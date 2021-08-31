const fs = require("fs")

const files = fs.readdirSync(__dirname)
	.filter(file => file !== "index.js")
	.map(file => require(`${__dirname}/${file}`))

module.exports = files