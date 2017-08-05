exports.up = async knex => {
  await knex.schema.createTable('deposits', table => {
    table.increments('depositId').primary()
    table.integer('playerId').notNullable().references('playerId').inTable('players')
    table.integer('voucherId').notNullable().references('voucherId').inTable('vouchers')
    table.date('createdAt')
  })
}

exports.down = async knex => {
  await knex.schema.dropTableIfExists('deposits')
}
