const test = require('ava')
const { sequelize, Voucher } = require('../../models')
const { voucherFinder } = require('../../services')

test.before(async t => {
  await sequelize.sync({ force: true })
})

test('#findByCodeTerm', async t => {
  await Promise.all([
    Voucher.create({ code: 'xxxx-xxxx-xxxx-xxxx-xxxx' }),
    Voucher.create({ code: 'xxxy-xxxx-xxxx-xxxx-xxxx' }),
    Voucher.create({ code: 'xxyy-xxxx-xxxx-xxxx-xxxx' }),
    Voucher.create({ code: 'xyyy-xxxx-xxxx-xxxx-xxxx' }),
    Voucher.create({ code: 'yyyy-xxxx-xxxx-xxxx-xxxx' })
  ])

  t.is((await voucherFinder.findByCodeTerm('xxxx', 5)).length, 1)
  t.is((await voucherFinder.findByCodeTerm('xxx', 5)).length, 2)
  t.is((await voucherFinder.findByCodeTerm('xx', 5)).length, 3)
  t.is((await voucherFinder.findByCodeTerm('x', 5)).length, 4)
})
