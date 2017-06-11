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

module.exports = {
  findByCodeTerm
}
