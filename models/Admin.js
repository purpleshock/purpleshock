const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
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
    timestamps: false
  })

  Admin.Instance.prototype.setPlainPassword = function (plain) {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(plain, salt))
      .then(hash => {
        this.password = hash
        return true
      })
  }

  Admin.Instance.prototype.comparePlainPassword = function (plain) {
    return bcrypt.compare(plain, this.password)
  }

  return Admin
}
