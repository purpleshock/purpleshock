const fs = require('fs')
const ini = require('ini')
const path = require('path')
const { NODE_ENV } = require('./env')

const configFilePath = path.resolve(process.cwd(), 'config.ini')
let configs
try {
  configs = ini.parse(fs.readFileSync(configFilePath, 'utf-8'))
} catch (err) {
  console.error('Error happens when loading config.ini, process exit.')
  process.exit(1)
}

if (!configs[NODE_ENV]) {
  console.error(`Invalid environment(${NODE_ENV}) in config.ini`)
  process.exit(1)
}

module.exports = configs[NODE_ENV]
