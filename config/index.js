const fs = require('fs')
const path = require('path')
const { NODE_ENV } = require('./env')

const configContent = fs.readFileSync(path.resolve(__dirname, './config.json'))
const config = JSON.parse(configContent)

module.exports = config[NODE_ENV]
