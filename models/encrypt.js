const bcrypt = require('bcrypt')

function generateHash (plain) {
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(plain, salt))
}

function equals (plain, hash) {
  return bcrypt.compare(plain, hash)
}

module.exports = {
  generateHash,
  equals
}
