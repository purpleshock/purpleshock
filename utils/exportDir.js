const fs = require('fs')
const path = require('path')

module.exports = function (dirpath) {
  return fs
    .readdirSync(dirpath)
    .map(file => path.resolve(dirpath, file))
    .filter(filePath => {
      const stat = fs.statSync(filePath)

      if (stat.isFile()) {
        const { name, ext } = path.parse(filePath)
        return (
          ext === '.js' &&              // is javascript file
          name.indexOf('.') !== 0 &&    // is not hidden file
          name.indexOf('.test') < 0 &&  // is not test file
          name !== 'index'              // is not index file
        )
      } else {
        return true
      }
    })
    .reduce((module, filePath) => {
      const pathObj = path.parse(filePath)
      module[pathObj.name] = require(filePath)
      return module
    }, {})
}
