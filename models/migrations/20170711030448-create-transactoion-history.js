exports.up = async knex => {
  await knex.schema.createTable('deposits', table => {
    table.increments('depositId').primary()
    table.integer('playerId').unsigned()
    table.foreign('playerId').references('players.playerId')
    table.integer('voucherId').unsigned()
    table.foreign('voucherId').references('vouchers.voucherId')
    table.date('createdAt')
  })
}

exports.down = async knex => {
  await knex.schema.dropTableIfExists('deposits')
}
