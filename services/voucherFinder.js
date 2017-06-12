const { Voucher } = require('../models')

async function findByCodeTerm (term, size) {
  const vouchers = await Voucher.findAll({
    where: {
      code: {
        $like: term + '%'
      }
    },
    limit: size
  })

  return vouchers.map(voucher => voucher.toJSON())
}

async function findByCode (code) {
  const voucher = await Voucher.find({
    where: {
      code
    }
  })
  return voucher && voucher.toJSON()
}

module.exports = {
  findByCodeTerm,
  findByCode
}
