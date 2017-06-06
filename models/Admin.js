const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => sequelize.define('Admin', {
  adminId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    type: Sequelize.DATE
  },
  loginAt: {
    type: Sequelize.DATE
  },
  mail: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  instanceMethods: {
    setPlainPassword (plain) {
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(plain, salt))
        .then(hash => {
          this.password = hash
          return true
        })
    },
    comparePlainPassword (plain) {
      return bcrypt.compare(plain, this.password)
    }
  }
})
