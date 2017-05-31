const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => sequelize.define('Admin', {
  createdAt: {
    type: DataTypes.DATE
  },
  loginAt: {
    type: DataTypes.DATE
  },
  mail: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'admins',
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