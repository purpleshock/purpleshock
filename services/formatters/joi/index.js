const joi = require('joi')
const exportDir = require('../../../utils/exportDir')

const plugins = Object.values(exportDir(__dirname))
let enhancedJoi

for (let plugin of plugins) {
  enhancedJoi = joi.extend(plugin)
}

module.exports = enhancedJoi
