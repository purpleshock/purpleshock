const voucherStatus = require('../VoucherStatus')

exports.up = async knex => {
  await knex.schema.createTable('batches', table => {
    table.increments('batchId').primary()
    table.integer('adminId').notNullable().references('adminId').inTable('admins')
    table.date('createdAt')
    table.date('validAt')
    table.date('expiredAt')
    table.string('code')
    table.string('description')

    table.unique('code')
  })

  await knex.schema.createTable('vouchers', table => {
    table.increments('voucherId').primary()
    table.integer('batchId').notNullable().references('batchId').inTable('batches')
    table.string('code')
    table.integer('amount')
    table.enum('status', voucherStatus.getAvailableStatus())

    table.unique('code')
  })
}

exports.down = async knex => {
  await knex.schema.dropTableIfExists('vouchers')
  await knex.schema.dropTableIfExists('batches')
}
