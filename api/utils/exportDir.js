const fs = require('fs')
const path = require('path')

module.exports = function (dirpath) {
  return fs
    .readdirSync(dirpath)
    .filter(file => (
      file.indexOf('.') !== 0 &&  // is hidden file
      file !== 'index.js' &&      // is not index file
      file.slice(-3) === '.js' && // is javascript file
      file.indexOf('.test') < 0   // is not test file
    ))
    .reduce((module, file) => {
      const modulePath = path.resolve(dirpath, file)
      const pathObj = path.parse(file)
      module[pathObj.name] = require(modulePath)
      return module
    }, {})
}
