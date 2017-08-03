const joi = require('joi')
const exportDir = require('../../../utils/exportDir')

const plugins = Object.values(exportDir(__dirname))
let enhancedJoi = joi

for (let plugin of plugins) {
  enhancedJoi = enhancedJoi.extend(plugin)
}

module.exports = enhancedJoi
